"use strict";

angular
    .module('ngDataGrid', [])
    /**
     * Директива ресует таблицу.
     * Параметры:
     *      - options:
     *          - showHeaders - показывать или нет заголовок таблицы
     *      - optionsChange - колбек, вызываемый при смене пользователем настроек таблицы.
     *      - columns - настройки колонок:
     *          - title* - выводимый тайтл колонки
     *          - name* - имя поля в списке данных
     *          - cssClass - дополнительный класс, применяемый ко всем ячейкам в колонке
     *          - visible - видимая колонка или нет
     *          - decorator - Если строка - "{{s}}" будет заменено на актуальные данные.
     *                        Если функция - в функцию будут переданы настройки колонки и текущая строка.
     *                        Функция должна вернуть строку.
     *          - headerOptions - настройки заголовка колонки
     *              - cssClass - переопределить дополнительный класс (классы через пробел) для тега TH
     *              - with - ширина колонки в "px" или "%"
     */
    .directive('grid', function () {
        return {
            restrict: "E",
            templateUrl: 'gridTemplate.html',
            scope: {
                options: '=gridOptions',
                optionsChange: '=gridOptionsChange',
                columns: '=gridColumns',
                data: '=gridData'
            },
            controller: function ($scope) {
                this.$scope = $scope;
            },
            link: function ($scope) {
                $scope.options = angular.extend({}, {
                    showHeaders: true
                }, $scope.options);
                angular.forEach($scope.columns, function (column, n) {
                    $scope.columns[n] = angular.extend({}, {visible: true}, column);
                });
            }
        };
    })
    .directive('gridHeaderOptions', function () {
        return {
            restrict: "A",
            scope: {
                column: '=gridHeaderOptions'
            },
            link: function ($s, $e) {
                if (!$s.column) return;

                var el = angular.element($e);

                var className = ($s.column.headerOptions && $s.column.headerOptions.cssClass) || $s.column.cssClass;
                if (className) {
                    el.addClass(className);
                }

                var width = $s.column.headerOptions && $s.column.headerOptions.width;
                if (width) {
                    el.css('width', width);
                }
            }
        };
    })
    .directive('gridCellOptions', function () {
        return {
            restrict: "A",
            scope: {
                data: '=gridCellOptions'
            },
            link: function ($scope, $element) {
                var column = $scope.data[0],
                    row = $scope.data[1],
                    applyDecorator = function (column, row) {
                        var value = row[column.name];
                        if (column.decorator) {
                            if (angular.isString(column.decorator)) {
                                return column.decorator.replace('{{s}}', value);
                            } else if (angular.isFunction(column.decorator)) {
                                return column.decorator(column, row);
                            }
                        }

                        return value;
                    };

                var className = column.cssClass;
                if (className) {
                    $element.addClass(className);
                }

                var value = applyDecorator(column, row);

                $element.html(value || '');
            }
        };
    });

angular.module('ngDataGrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('gridTemplate.html',
    "<div class=grid-wrap><div class=grid-options-btn dropdown><div dropdown-toggle class=\"btn btn-default\"><i class=\"fa fa-gear\"></i></div><ul class=\"dropdown-menu dropdown-menu-right\"><li><a href=# ng-click=\"options.showHeaders = !options.showHeaders\"><i class=\"fa fa-fw\" ng-class=\"{'fa-check': options.showHeaders}\"></i> Показывать заголовок таблицы</a></li><li class=divider></li><li class=dropdown-header>Показывать колонки</li><li ng-repeat=\"column in columns\"><a href=# ng-click=\"column.visible = !column.visible\"><i class=\"fa fa-fw\" ng-class=\"{'fa-check': column.visible !== false}\"></i> {{column.title}}</a></li></ul></div><table class=\"table table-bordered\"><tr ng-show=options.showHeaders><th ng-repeat=\"column in columns\" ng-if=\"column.visible !== false\" grid-header-options=column>{{column.title}}</th></tr><tr ng-repeat=\"row in data\"><td ng-repeat=\"column in columns\" ng-if=\"column.visible !== false\" grid-cell-options=\"[column, row]\"></td></tr></table></div>"
  );

}]);
