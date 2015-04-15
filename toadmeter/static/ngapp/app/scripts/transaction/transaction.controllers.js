/*global angular, console, Highcharts */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');

    mdl.controller('Transaction.StatsCtrl', ['$q', '$scope', '$state', 'Stat', 'Transaction', 'Tag', '$timeout',
        function ($q, $scope, $state, Stat, Transaction, Tag, $timeout) {

            $scope.stats = Stat.$collection({type: $scope.type});
            $scope.stats
                .$refresh()
                .$then(function (response) {
                    $scope.chartConfig = Stat.getChartConfig($scope.stats);
                });
            
//            $scope.$watch(function () { return $scope.stats; }, function (newValue) {
//                  //this will fire on stats[0].prop, but not on stats[0].$prop
//                console.log('newValue');
//            }, true);
            
            $scope.toggleTag = function (tag) {
                // $-starting props are ignored in $watch, but I don't plan to save stats anyway and can redraw graph manually
//                tag.$off = ng.isDefined(tag.$off) ? !tag.$off : true;
//                tag.off = ng.isDefined(tag.off) ? !tag.off : true;
                $scope.chartConfig = Stat.getChartConfig($scope.stats);
            };
        }]);

    mdl.controller('Transaction.EditCtrl', ['$q', '$scope', '$state', '$stateParams', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope, $state, $stateParams, Auth, Transaction, Tag) {

            //            console.log($scope.type);
            $scope.transaction = Transaction.getOrCreate($stateParams.transaction_id);
            $scope.tags = Tag.$collection({
                type: $scope.type
            });
            $scope.tags.$refresh();

            $scope.save = function () {
                $scope.transaction.type = $scope.type;
                $scope.transaction
                    .$save()
                    .$then(function () {
                        var url = {
                            "in": 'secure.incomes.list',
                            "out": 'secure.costs.list'
                        }[$scope.type];
                        $state.go(url);
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
                if ($scope.newTagText.length > 0) {
                    var newTag = $scope.tags.$create({text: $scope.newTagText, type: $scope.type});
                    $scope.newTagText = null;
                }
            };

        }]);


    mdl.controller('Transaction.ListCtrl', ['$q', '$scope', '$state', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope, $state, Auth, Transaction, Tag) {


            $scope.transactions = Transaction.$collection({
                type: $scope.type
            });
            $scope.tags = Tag.$collection();
            $scope.transactions.$refresh();
            $scope.tags.$refresh();
            $scope.editButtonUrl = $scope.type === 'in' ? 'secure.incomes.edit' : 'secure.costs.edit';

            //            $q.all([Transaction.$collection().$refresh().$asPromise(), Tag.$collection().$refresh().$asPromise()]).then(function (responses) {
            //                console.log('got ', responses);
            //                $scope.transactions = responses[0];
            //                $scope.tags = responses[1];
            //            });

            $scope.getTag = function (tag_id) {
                var tag = null;
                if ($scope.tags.length > 0) {
                    tag = Tag.getFromCollection($scope.tags, tag_id);
                }
                return tag;
            };


        }]);


}(angular));