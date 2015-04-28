/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');
    
    
    mdl.directive('tagsList', ['$q', '$filter', 'APP_ROOT_FOLDER', 'Tag',
        function ($q, $filter, ROOT, Tag) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'tag/templates/list.html',
                scope: {},
//                controller: 'Tag.ListCtrl',
                controller: function ($scope) {
                    
//                    $q.all([Tag.$collection({type: 'in'}).$refresh()]);
                    
//                    $scope.incomes = Tag.$collection({type: 'in'}).$refresh();
//                    $scope.costs = Tag.$collection({type: 'out'}).$refresh();
                    
                    Tag.$collection()
                        .$refresh()
                        .$then(function (response) {
                            $scope.incomes = $filter('where')(response, {type: 'in'});
                            $scope.expenses = $filter('where')(response, {type: 'out'});
                        });
                },
                link: function () {
                }
            };
            
        }]);

    
    mdl.directive('tagsListFiltered', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'tag/templates/table.html',
                scope: {
                    tags: '='
                },
//                controller: 'Tag.ListCtrl',
                link: function ($scope) {
                                
                    $scope.deleteTag = function (tag) {
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
                }
            };
            
        }]);
    
}(angular));