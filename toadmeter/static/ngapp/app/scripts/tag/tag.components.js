/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');
    
    
    mdl.directive('tagsList', ['APP_ROOT_FOLDER', 'Tag',
        function (ROOT, Tag) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'tag/templates/list.html',
                scope: {},
                controller: 'Tag.ListCtrl',
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
                controller: 'Tag.TableCtrl',
                link: function () {
                }
            };
            
        }]);
    
}(angular));