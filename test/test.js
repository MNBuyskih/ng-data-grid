angular
    .module('Example', ['ui.bootstrap', 'ngDataGrid'])
    .controller('ExampleCtrl', function ($scope) {
        $scope.gridOptions = {};
        $scope.optionsChange = function () {
            console.log(arguments);
        };
        $scope.columns = [
            {
                title: 'Cell 1',
                name: 'cell-1',
                decorator: "{{s}}%",
                cssClass: 'bg-danger',
                headerOptions: {cssClass: 'bg-primary', width: '20%'}
            },
            {
                title: 'Cell 2',
                name: 'cell-2',
                visible: false,
                headerOptions: {cssClass: 'bg-warning', width: '10%'}
            },
            {
                title: 'Cell 3',
                name: 'cell-3',
                decorator: function (column, row) {
                    var i = $scope.data.indexOf(row);
                    if (i >= 0) {
                        return '#' + (i + 1) + ' - ' + row[column['name']];
                    }
                    return row[column['name']];
                },
                headerOptions: {cssClass: 'bg-success', width: '80%'}
            }
        ];
        $scope.data = [
            {'cell-1': "Example cell 1", 'cell-2': "Example cell 2", 'cell-3': "Example cell 3"},
            {'cell-1': "Example cell 1", 'cell-2': "Example cell 2", 'cell-3': "Example cell 3"},
            {'cell-1': "Example cell 1", 'cell-2': "Example cell 2", 'cell-3': "Example cell 3"},
            {'cell-1': "Example cell 1", 'cell-2': "Example cell 2", 'cell-3': "Example cell 3"},
        ];
    });