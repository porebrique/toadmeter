/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');

    mdl.controller('Transaction.ListCtrl', ['$q', '$scope', '$state', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope,  $state, Auth, Transaction, Tag) {
            
            
            $scope.transactions = Transaction.$collection({type: $scope.type});
            $scope.tags = Tag.$collection();
            $scope.transactions.$refresh();
            $scope.tags.$refresh();
            
//            $q.all([Transaction.$collection().$refresh().$asPromise(), Tag.$collection().$refresh().$asPromise()]).then(function (responses) {
//                console.log('got ', responses);
//                $scope.transactions = responses[0];
//                $scope.tags = responses[1];
//            });
            
            $scope.getTag = function (tag_id) {
                var tag = null;
                if ($scope.tags.length > 0) {
                    tag =  Tag.getFromCollection($scope.tags, tag_id);
                }
                return tag;
            };
            
            
        }]);


}(angular));