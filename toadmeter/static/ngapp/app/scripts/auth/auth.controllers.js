/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('AuthModule');

    mdl.controller('auth.LogoutCtrl', ['$scope', '$state', 'Auth',
        function ($scope,  $state, Auth) {
            
            $scope.logout = function () {
                Auth.logout()
                    .then(function (response) {
                        //$scope.user = Auth.getUser();
//                        $state.go('logout');
                        $state.go('public.home');
                    });
            };
            
        }]);
    
    mdl.controller('auth.LoginCtrl', ['$scope', '$location', '$state', 'Auth',
        function ($scope, $location, $state, Auth) {
            
            $scope.is = {
                saving: false
            };
            
            $scope.user = {
            };
            

            $scope.login = function () {
                $scope.is.saving = true;
                Auth.login({
                    username: $scope.user.username,
                    password: $scope.user.password,
                    remember: $scope.user.rememberme
                })
                    .then(function (res) {
                        //console.log('oklogged');
                        //$scope.user = Auth.getUser();
                        $scope.is.saving = false;
                    })
                    .catch(function (response) {
//                        console.log(response);
                        $scope.is.saving = false;
                        if (response.status === 403) {
                            $scope.error = 'Неверная пара логин+пароль';
                        }
                        if (response.status === 400) {
                            $scope.error = 'Логин либо пароль не получен';
                        }
                    });
            };


        }]);

    mdl.controller('auth.RegCtrl', ['$scope', '$location', '$state', 'Auth',
        function ($scope, $location, $state, Auth) {
            $scope.submit = function () {
                console.log('Submitting new user');
            };
            
        }]);


}(angular));