/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('AuthModule');

    mdl.directive('authLogin', ['$location', '$state', 'APP_ROOT_FOLDER', 'Auth',
        function ($location, $state, ROOT, Auth) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'auth/templates/login.html',
                scope: {},
                controller: 'auth.LoginCtrl',
                link: function ($scope, elt) {

                }
            };
            
        }]);
    
    mdl.directive('authLogout', ['$location', '$state', 'APP_ROOT_FOLDER', 'Auth',
        function ($location, $state, ROOT, Auth) {
            return {
                restrict: 'A',
                scope: {},
                controller: 'auth.LogoutCtrl',
                link: function ($scope, elt) {
                    elt.bind('click', function (event) {
                        $scope.logout();
                    });
                }
            };
            
        }]);    
    mdl.directive('authRegistration', ['$location', '$state', 'APP_ROOT_FOLDER', 'Auth',
        function ($location, $state, ROOT, Auth) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'auth/templates/reg.html',
                scope: {},
                controller: 'auth.RegCtrl',
                link: function () {
                }
            };
            
        }]);

    
    
}(angular));