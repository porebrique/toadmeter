/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');
    
    mdl.controller('Tag.ListCtrl', ['$q', '$scope', '$state', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope, $state, Auth, Transaction, Tag) {
            
            $scope.incomes = Tag.$collection({type: 'in'}).$refresh();
            $scope.costs = Tag.$collection({type: 'out'}).$refresh();

        }]);

}(angular));