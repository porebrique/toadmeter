/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');
    
    mdl.directive('transactionsList', ['$location', '$state', 'APP_ROOT_FOLDER', 'User',
        function ($location, $state, ROOT, User) {
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
    


}(angular));