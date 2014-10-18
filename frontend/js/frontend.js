(function(undefined){
	'use strict';
	// Declare app level module which depends on filters, and services
	var app = angular.module('documaker', [
		'ngRoute',
		'documentService',
		'navigationService',
		'treeDirective',
		'titleDirective',
		'paragraphDirective',
		'startScreenController',
		'editorController'
	]);

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider.
		when("/",  {templateUrl:'partials/start.html',  controller:'startScreenCtrl'}).
		when("/editor/:template",  {templateUrl:'partials/editor/main.html',  controller:'editorCtrl'}).
		otherwise({redirectTo: '/'});
	}]);
})();