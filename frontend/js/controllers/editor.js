(function(undefined){
	"use strict";

	var editor = angular.module('editorController', []);

	editor.controller('editorCtrl', ['$scope', '$location', '$compile', 'documentServ', 'navigationServ', function($scope, $location, $compile, documentServ, navigationServ) {
		$scope.titleEdit = false;
		$scope.document = documentServ;
		$scope.titleEditToggle = function()
		{
			$scope.titleEdit = !($scope.titleEdit);
		};
		
		$scope.tabs = [{'url': 'partials/editor/editor.html'},
					   {'url': 'partials/editor/settings.html'},
					   {'url': 'partials/editor/build.html'}];
		$scope.currentTab = 0;
		$scope.activeTab = $(".nav-tabs .active");
		$scope.changeTab = function(id){
			return function(event){
				event.preventDefault();
				$scope.activeTab.removeClass("active");
				$scope.activeTab =  $(event.target).parent();
				$scope.activeTab.addClass("active");
				$scope.currentTab = id;
				$scope.$apply();
			}
		}
		$("#editorTab").click($scope.changeTab(0, this));
		$("#settingsTab").click($scope.changeTab(1, this));
		$("#buildTab").click($scope.changeTab(2, this));

		$scope.navigation = navigationServ;
		$scope.drawElement = function(id)
		{
			var contents = $scope.navigation.currentSection.contents;
			var html = '<div ' + contents[id].type + ' class="' + contents[id].type + '" value="navigation.currentSection.contents[' + id + '].value"></div>';
			return $compile(html)($scope);
		};
		$scope.redrawSection = function()
		{
			$('#contents > .section > div').remove();
			var contents = $scope.navigation.currentSection.contents;
			if(contents != undefined)
			{
				for(var i = 0; i < contents.length; i++)
				{
					$('#contents > .section').append($scope.drawElement(i));
				}
			}
		};
		$scope.addElement = function(event, id, type)
		{
			var contents = $scope.navigation.currentSection.contents;
			contents.splice(id, 0, {});
			contents[id].type = type;
			if(type == 'paragraph')
			{
				contents[id].value = "Новый параграф";
			}
			$scope.redrawSection();
		};
		$scope.$watch('navigation.currentSection', $scope.redrawSection);

		$scope.downloadTex = function()
		{
			$scope.document.buildTex(function(){
				var blob = new Blob([$scope.document.tex], {type: "text/plain"});
				saveAs(blob, "report.tex");
			});
			return false;
		}
	}]);
})();