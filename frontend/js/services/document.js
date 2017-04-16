(function(undefined){
	"use strict";
	var documentServ = angular.module('documentService', []);
	documentServ.factory('documentServ', ['$rootScope', function($rootScope){
		var documentServ = {};
		documentServ.hierarchy = {
								  'title': 'Новый документ', 
								  'sections': [
								  	{'title': 'Титульный лист',
								  	 'type': 'title-page'},
									{'title': 'Цель работы',
									 'type': 'chapter',
									 'contents': []},
									{'title': 'Задание',
									 'type': 'chapter',
									 'contents': []},
									{'title': 'Листинг программы',
									 'type': 'chapter',
									 'contents': []},
									{'title': 'Вывод',
									 'type': 'chapter',
									 'contents': []}]
								 };
		documentServ.settings = {'reportTitle': 'Пробный отчет',
								 'reportNumber': '5',
								 'reportSubject': 'Программирование на ЯВУ',
								 'reportCity': 'Томск',
								 'reportYear': '2015',
								 'reportAuthorName': 'Ветров А.А.',
								 'reportAuthorInfo': 'студент гр. 8И32',
								 'reportAuthorFacility': 'Кибернетики',
								 'reportAuthorSpeciality': 'Информационные системы и технологии',
								 'reportAuthorDepartment': 'Вычислительной техники',
								 'reportTeacherName': 'Лепустин А.В.',
								 'reportTeacherInfo': 'Cтарший преподаватель'
								 };
		documentServ.tex = '';
		documentServ.buildTex = function()
		{
			$.get("tex/report.tex", function(tex) {
				tex = tex.replace(/%%report-title%%/, documentServ.settings.reportTitle);
				tex = tex.replace(/%%report-subject%%/, documentServ.settings.reportSubject);
				tex = tex.replace(/%%report-city%%/, documentServ.settings.reportCity);
				tex = tex.replace(/%%report-year%%/, documentServ.settings.reportYear);
				tex = tex.replace(/%%report-author-name%%/, documentServ.settings.eportAuthorName);
				tex = tex.replace(/%%report-author-facility%%/, documentServ.settings.reportAuthorFacility);
				tex = tex.replace(/%%report-author-speciality%%/, documentServ.settings.reportAuthorSpeciality);
				tex = tex.replace(/%%report-author-department%%/, documentServ.settings.reportAuthorDepartment);
				tex = tex.replace(/%%report-author-info%%/, documentServ.settings.reportAuthorInfo);
				tex = tex.replace(/%%report-teacher-name%%/, documentServ.settings.reportTeacherName);
				tex = tex.replace(/%%report-teacher-info%%/, documentServ.settings.reportTeacherInfo);
				tex = tex.replace(/%%report-number%%/, documentServ.settings.reportNumber);
				var body = '';
				for(var i = 1; i < documentServ.hierarchy.sections.length; i++)
				{
					body += '\\chapter{' + documentServ.hierarchy.sections[i].title + '}\n';
					for(var j = 0; j < documentServ.hierarchy.sections[i].contents.length; j++)
					{
						body += documentServ.hierarchy.sections[i].contents[j].value + '\n\n';
					}
				}
				tex = tex.replace(/%%chapters%%/, body);
				documentServ.tex = tex;
				$rootScope.$apply();
			});
		}
		return documentServ;
	}]);
})();