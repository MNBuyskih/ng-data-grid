angular.module('ngDataGrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('gridTemplate.html',
    "<div class=grid-wrap><div class=grid-options-btn dropdown><div dropdown-toggle class=\"btn btn-default\"><i class=\"fa fa-gear\"></i></div><ul class=\"dropdown-menu dropdown-menu-right\"><li><a href=# ng-click=\"options.showHeaders = !options.showHeaders\"><i class=\"fa fa-fw\" ng-class=\"{'fa-check': options.showHeaders}\"></i> Показывать заголовок таблицы</a></li><li class=divider></li><li class=dropdown-header>Показывать колонки</li><li ng-repeat=\"column in columns\"><a href=# ng-click=\"column.visible = !column.visible\"><i class=\"fa fa-fw\" ng-class=\"{'fa-check': column.visible !== false}\"></i> {{column.title}}</a></li></ul></div><table class=\"table table-bordered\"><tr ng-show=options.showHeaders><th ng-repeat=\"column in columns\" ng-if=\"column.visible !== false\" grid-header-options=column>{{column.title}}</th></tr><tr ng-repeat=\"row in data\"><td ng-repeat=\"column in columns\" ng-if=\"column.visible !== false\" grid-cell-options=\"[column, row]\"></td></tr></table></div>"
  );

}]);
