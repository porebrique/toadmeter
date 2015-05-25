/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');


    mdl.controller('Tag.ListCtrl', ['$filter', '$scope', 'Tag',
        function ($filter, $scope, Tag) {
            
            $scope.incomes = Tag.$collection({type: 'in'});
            $scope.expenses = Tag.$collection({type: 'out'});
            $scope.incomes.$refresh();
            $scope.expenses.$refresh();

        }]);
    
    
    mdl.controller('Tag.TableCtrl', ['$q', '$scope', 'Tag',
        function ($q, $scope, Tag) {
            
            
            $scope.deleteTag = function (tag) {
                tag.$isDeleting = true;
                tag.$destroy();
            };

            $scope.editTag = function (tag) {
                if (tag.$isEdited) {
                    tag
                        .$save(['text'])
                        .$then(function (response) {
                            tag.$isEdited = false;
                        });
                } else {
                    tag.$isEdited = true;
                }
            };
        }]);

    
}(angular));