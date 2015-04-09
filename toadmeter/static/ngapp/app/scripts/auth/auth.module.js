/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('AuthModule', []);
    
    mdl.run(['$rootScope', '$localStorage', 'Auth',
        function ($rootScope, $localStorage, Auth) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                Auth.checkAuthentication(event, toState, toParams, fromState, fromParams);
            });
            
            
//            console.log($localStorage);
            $rootScope.auth = $localStorage.auth;
            
        }]);


}(angular));