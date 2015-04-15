/*global angular, console */

(function (ng) {
    'use strict';
    
    var app = ng.module('TagModule');
    
    app.config(['$stateProvider', function ($stateProvider) {
        

        $stateProvider
            .state('secure.tags', {
                abstract: true,
                url: 'tags/',
                template: '<ui-view />',
                data: {
                }
            })
            .state('secure.tags.list', {
                url: 'list/',
                template: '<tags-list />',
                data: {
                    pageName: 'Список меток'
                }
            });
        
    }]);
}(angular));