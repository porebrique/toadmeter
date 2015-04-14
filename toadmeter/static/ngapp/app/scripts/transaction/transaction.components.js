/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');
    
    mdl.directive('transactionsStats', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'transaction/templates/stats.html',
                scope: {
                    type: '@'
                },
                controller: 'Transaction.StatsCtrl',
                link: function () {
                }
            };
            
        }]);
    
    mdl.directive('transactionsList', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'transaction/templates/list.html',
                scope: {
                    type: '@'
                },
                controller: 'Transaction.ListCtrl',
                link: function () {
                }
            };
            
        }]);
    
    mdl.directive('transactionEdit', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'transaction/templates/edit.html',
                scope: {
//                    transactions: '='
                    type: '@'
                },
                controller: 'Transaction.EditCtrl',
                link: function () {
                }
            };
            
        }]);
    


}(angular));