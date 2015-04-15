/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');
    

    mdl.directive('tagsList', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'tag/templates/list.html',
                scope: {},
                controller: 'Tag.ListCtrl',
                link: function () {
                }
            };
            
        }]);

}(angular));