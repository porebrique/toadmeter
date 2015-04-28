/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('AuthModule');

    mdl.controller('auth.LogoutCtrl', ['$scope', '$timeout', '$state', 'Auth',
        function ($scope, $timeout,  $state, Auth) {
            
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

    mdl.controller('auth.RegCtrl', ['$scope', '$location', '$state', 'Auth', 'User',
        function ($scope, $location, $state, Auth, User) {
            
//            $scope.user = User.$build();
            
            $scope.submit = function () {
                $scope.error = null;
                Auth.reg($scope.user)
                    .then(function (response) {
//                        console.log('got reponse from Auth.reg', response);
                        Auth.login($scope.user);
                    })
                    .catch(function (error) {
                        console.log('error is', error);
                        if (error.status === 500) {
                            $scope.error = 'KABOOM! 500';
                        } else {
                            $scope.error = error.data;
                        }
                        
                        
                    });
            };
            
        }]);


}(angular));