(function(undefined){
	"use strict";
	var tree = angular.module('treeDirective', []);
	tree.directive('tree', ['navigationServ', function(navigationServ){
		return {
			link: function (scope, element, attrs) {
				var data = [];
				var chapters = navigationServ.hierarchy.sections;
				for(var i = 0; i < chapters.length; i++){
					data[i] = {};
					data[i].id = 'chapt-' + i;
					data[i].text = chapters[i].title;
					data[i].parent = '#';
					if(i == 0)
						data[i].state = {selected: true};
					//if(chapters[i])
				}
				element.jstree({
					'core' : {
						'themes' : {
						  'name': 'proton',
						  'icons' : false
						},
						'data' : data
					}
				});
				element.on('select_node.jstree', function(e, data){
					navigationServ.changeSection(data.node.id.split('-')[1]);
				});
				//console.log(data);
			},
			priority: 0,
			restrict: 'E',
			scope: false      
		};
	}]);
})();