/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');
    
    mdl.controller('Tag.ListCtrl', ['$q', '$scope', '$state', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope, $state, Auth, Transaction, Tag) {
            
            $scope.tags = Tag.$collection().$refresh();
            
            $scope.deleteTag = function (tag) {
                tag.$destroy();
            };
            
        }]);

}(angular));