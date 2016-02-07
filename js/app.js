var app = angular.module('addressBook', ['ngRoute']);

// Pages
app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/edit', {
			templateUrl: 'views/edit.html',
			controller: EditCtrl
		});
		$routeProvider.when('/edit/:index', {
			templateUrl: 'views/edit.html',
			controller: EditCtrl
		});
		$routeProvider.when('/list', {
			templateUrl: 'views/list.html',
			controller: ListCtrl
		});
		$routeProvider.otherwise({
			redirectTo: '/list'
		});
	}
]);

// Whitelist file export
app.config(['$compileProvider',
	function ($compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
	}
]);

// Load and read file import
app.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			var fn = $parse(attrs.onReadFile);
			element.on('change', function (onChangeEvent) {
				var reader = new FileReader();
				reader.onload = function (onLoadEvent) {
					scope.$apply(function () {
						fn(scope, {
							$fileContent: onLoadEvent.target.result
						});
					});
				};
				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});