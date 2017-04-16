(function(undefined){
	"use strict";
	var paragraph = angular.module('paragraphDirective', []);
	paragraph.directive('paragraph', function(){
        return {
			link: function (scope, element, attrs) {
				scope.edit = false;
				element.children('p').on('click', function(){
					scope.edit = true;
					scope.$apply();
					element.children('textarea').focus();
				});
				element.children('textarea').on('blur', function(){
					scope.edit = false;
					scope.$apply();
				});
				element.children('textarea').on('keypress', function(event){
					if (event.keyCode == 13) {
						event.preventDefault();
						event.stopPropagation();
						$(this).blur();
					}
				});
			},
			scope: {
				'value': '='
			},
			templateUrl: 'partials/editor/elements/paragraph.html',
			priority: 0,   
		};
    });
})();