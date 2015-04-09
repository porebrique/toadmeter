/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('UserModule');

    mdl.factory('User', ['RestmodTemplate', function (RestmodTemplate) {
        
//        return RestmodTemplate.provideModel('users', mix);
        return RestmodTemplate.provideModel('users');
    }]);

    
    
}(angular));