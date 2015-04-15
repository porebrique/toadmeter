/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');
    
    
    mdl.factory('Tag', ['RestmodTemplate', function (RestmodTemplate) {
        return RestmodTemplate.provideModel('tags');
    }]);
        


}(angular));