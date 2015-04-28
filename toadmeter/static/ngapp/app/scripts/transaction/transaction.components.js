/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');
    
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
    
    mdl.directive('transactionsImport', ['$http', 'APP_ROOT_FOLDER',
        function ($http, ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'transaction/templates/import.html',
//                scope: {},
//                controller: 'Transaction.ImportCtrl',
                link: function ($scope) {
                    
                    $scope.format = 'toshl';
                    $scope.csv = '';
                    
                    $scope.upload = function () {
                        $scope.error = null;
                        
                        $http.post('/api/transactions/upload/', {format: $scope.format, csv: $scope.csv})
                            .then(function (response) {
//                                console.log('uploaded');
                                $scope.message = response.data;
                            })
                            .catch(function (error) {
                                if (error.status === 500) {
                                    $scope.error = '500 some really unexpected error';
                                } else {
                                    $scope.error = error.data;
                                }
                            });
                    };
                    
                }
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