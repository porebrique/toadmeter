/*global angular, console, Highcharts */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');

    mdl.controller('Transaction.StatsCtrl', ['$q', '$scope', '$state', 'Stat', 'Transaction', 'Tag', '$timeout',
        function ($q, $scope, $state, Stat, Transaction, Tag, $timeout) {

            function redrawGraphs() {
                $scope.pieChartConfig = Stat.getChartConfig('pie', $scope.stats);
                $scope.columnChartConfig = Stat.getChartConfig('column', $scope.stats);
            }
            
            Stat.$collection({type: $scope.type})
                .$refresh()
                .$then(function (response) {
                    ng.forEach(response, function (tag) {
                        tag.enabled = true;
                    });
//                    $scope.stats = Stat.prepareStats(response);
                    $scope.stats = response;
//                    console.log($scope.stats);
                    Stat.updateData($scope.stats);
                    redrawGraphs();
                });
            
            
            $scope.toggleTag = function (tag) {
                console.log('toggle tag');
                Stat.updateData($scope.stats);
                redrawGraphs();
            };
        }]);

    mdl.controller('Transaction.EditCtrl', ['$q', '$scope', '$state', '$stateParams', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope, $state, $stateParams, Auth, Transaction, Tag) {

            var listUrl = {
                "in": 'secure.incomes.list',
                "out": 'secure.costs.list'
            };
//            console.log($scope.type);
            
            $scope.transaction = Transaction.getOrCreate($stateParams.transaction_id);
            $scope.tags = Tag.$collection({type: $scope.type});
            $scope.tags.$refresh();

            $scope.save = function () {
                $scope.transaction.type = $scope.type;
                $scope.transaction
                    .$save()
                    .$then(function () {
                        $state.go(listUrl[$scope.type]);
                    });
            };

            $scope.appendDigit = function (what) {
                var size = $scope.transaction.size;
                size = ng.isUndefined(size) ? '' : size.toString();
                
                if (ng.isNumber(what)) {
                    size = size + what.toString();
                } else {
                    size = size.substr(0, size.length - 1);
                }
                $scope.transaction.size = size;
            };
            
            $scope.addTag = function () {
                if ($scope.newTagText && $scope.newTagText.length > 0) {
                    var newTag = $scope.tags.$create({text: $scope.newTagText, type: $scope.type});
                    $scope.newTagText = null;
                }
            };
            $scope.remove = function () {
                $scope.transaction.$destroy()
                    .$then(function () {
                        $state.go(listUrl[$scope.type]);
                    });
            };

        }]);


    mdl.controller('Transaction.ListCtrl', ['$q', '$scope', '$state', '$filter', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope, $state, $filter, Auth, Transaction, Tag) {
            
            Transaction
                .$collection({
                    type: $scope.type
                })
                .$refresh()
                .$then(function (response) {
//                    $scope.transactions = $filter('unique')(response, 'date');
                    $scope.transactions = response;
                });
            $scope.tags = Tag.$collection();
//            $scope.transactions.$refresh();
            $scope.tags.$refresh();
            $scope.addButtonUrl = $scope.type === 'in' ? 'secure.incomes.edit' : 'secure.costs.edit';
            
            
            $scope.getSumFor = function (date) {
                console.log(date);
                var sum = 0,
                    selection = $filter('where')($scope.transactions, {date: date});
                ng.forEach(selection, function (ta) {
                    sum += ta.size;
                });
//                console.log(sum);
                return sum;
            };
            
            $scope.getEditUrlFor = function (ta) {
                var url = $scope.addButtonUrl + '({transaction_id: %id%})';
                url = url.replace('%id%', ta.id);
                return url;
            };
            
            $scope.toggle = function (day) {
                if ($scope.openDay === day) {
                    $scope.openDay = null;
                } else {
                    $scope.openDay = day;
                }
            };

            
            $scope.getTag = function (tag_id) {
                var tag = null;
                if ($scope.tags.length > 0) {
                    tag = Tag.getFromCollection($scope.tags, tag_id);
                }
                return tag;
            };


        }]);


}(angular));