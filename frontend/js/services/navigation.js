(function(undefined){
	"use strict";
	var navigationServ = angular.module('navigationService', []);
	navigationServ.factory('navigationServ', ['$rootScope', 'documentServ', function($rootScope, documentServ){
		var navigationServ = {};
		navigationServ.hierarchy = documentServ.hierarchy;
		navigationServ.currentSection = navigationServ.hierarchy.sections[0];
		navigationServ.changeSection = function(id){
			this.currentSection = this.hierarchy.sections[id];
			$rootScope.$apply();
		};
		return navigationServ;
	}]);
})();