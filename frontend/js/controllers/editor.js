(function(undefined){
	"use strict";

	var editor = angular.module('editorController', []);

	editor.controller('editorCtrl', ['$scope', '$location', function($scope, $location) {
		$scope.titleEdit = false;
		$scope.titleEditToggle = function()
		{
			console.log("WOW");
			$scope.titleEdit = !($scope.titleEdit);
		};
		
		$scope.tabs = [{'url': 'partials/editor/editor.html'},
					   {'url': 'partials/editor/settings.html'},
					   {'url': 'partials/editor/build.html'}];
		$scope.currentTab = $scope.tabs[0];
		$scope.tabOnLoad = function(){
			$('#jstree-contatiner').jstree({
			  'core' : {
			    'themes' : {
			      'name': 'proton',
			      'icons' : false
			    }
			  },
			});
		};
		$scope.activeTab = $(".nav-tabs .active");
		$("#editorTab").click(function(event){
			event.preventDefault();
			$scope.activeTab.removeClass("active");
			$scope.activeTab = $(this).parent();
			$scope.activeTab.addClass("active");
			$scope.currentTab = $scope.tabs[0];
			$scope.$apply();
		});
		$("#settingsTab").click(function(event){
			event.preventDefault();
			$scope.activeTab.removeClass("active");
			$scope.activeTab = $(this).parent();
			$scope.activeTab.addClass("active");
			$scope.currentTab = $scope.tabs[1];
			$scope.$apply();
		});
		$("#buildTab").click(function(event){
			event.preventDefault();
			$scope.activeTab.removeClass("active");
			$scope.activeTab = $(this).parent();
			$scope.activeTab.addClass("active");
			$scope.currentTab = $scope.tabs[2];
			$scope.$apply();
		});
	}]);
})();