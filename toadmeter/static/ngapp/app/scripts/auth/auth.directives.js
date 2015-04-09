/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('AuthModule');

    mdl.directive('authCurrentUserName', ['Auth',
        function (Auth) {
            return {
                restrict: 'E',
                template: '<strong>User: {{user.first_name}}</strong>',
                link: function (scope, element) {
//                    console.log(Auth.user, Auth.getUser());
//                    scope.user = Auth.user;
//                    scope.user = Auth.getUser();
                    
                }
            };

        }]);

//    mdl.directive('authLogout', ['Auth',
//        function (Auth) {
//            return {
//                restrict: 'A',
//                link: function (scope, element) {
//                    element.click(function () {
//                        //console.log('clicked');
//                        Auth.logout();
//                    });
//                }
//            };
//
//        }]);


}(angular));