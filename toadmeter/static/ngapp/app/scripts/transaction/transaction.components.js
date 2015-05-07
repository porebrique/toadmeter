/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');
    
    mdl.directive('transactionPeriodFilter', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'transaction/templates/period-filter.html',
                scope: {
                    list: '='
                },
                controller: 'Transaction.PeriodFilterCtrl',
                link: function () {
                }
            };
            
        }]);
        
    mdl.directive('tmNumpad', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'transaction/templates/numpad.html',
//                scope: {},
//                controller: 'Transaction.StatsCtrl',
                link: function () {
                }
            };
            
        }]);
    
    mdl.directive('transactionsImport', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'transaction/templates/import.html',
//                scope: {},
                controller: 'Transaction.ImportCtrl',
                link: function () {}
            };
            
        }]);
    
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