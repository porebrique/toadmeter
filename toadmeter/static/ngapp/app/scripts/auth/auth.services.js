/*global angular, console */
(function (ng) {
    'use strict';
    
    var mdl = ng.module('AuthModule');

    mdl.factory('Auth', ['$http', '$rootScope', '$cookieStore', '$state', '$timeout', '$localStorage', '$mdToast', '$animate',
        function ($http, $rootScope, $cookieStore, $state, $timeout, $localStorage, $mdToast, $animate) {
//            console.log('auth service');
            var storage,
                desiredState = null;
            
            
            function StorageConstructor() {
                var self = this,
                    storage,
                    storageService = $localStorage;
//                self.storage;
                
//                console.log('before init storageService.auth is', storageService.auth);
                
                function init() {
                    if (ng.isUndefined(storageService.auth)) {
                        storageService.auth = {};
                    }
                    storage = storageService.auth;
                    $rootScope.auth = $localStorage.auth;
                }
                
                init();
                
                self.get = function (what) {
                    if (ng.isUndefined(storage[what])) {
                        console.log('und!');
                        storage[what] = false;
                    }
//                    console.log(storage);
                    return storage[what];
                };
                
                self.set = function (name, value) {
                    storage[name] = value;
                };
                
                

                
                self.reset = function () {
                    delete storageService.auth;
                    
//                    console.log('after reset storageService.auth is', storageService.auth);
//                    storage = {};
//                    console.log('and self.storage is', storage);
//                    delete $rootScope.auth;
//                    console.log('after reset $rootScope.auth is', $rootScope.auth);
                    init();
                    
//                    $rootScope.auth = {};
                };
            
            }
            
            function isLogged() {
                return storage.get('isLogged');
            }
                        
            
            /*  Public methods  */
            
            function reg(user) {
                return $http.post('/api/reg', user)
                    .then(function (response) {
                        return response;
                    });
            }
            
            function login(user) {
                return $http.post('/api/login', user)
                    .then(function (response) {
                        storage.set('isLogged', true);
                        storage.set('user', response.data.user);
                        var destination = desiredState ? desiredState.name : 'secure.costs.list';
                        desiredState = null;
                        // Not sure if timeout is useful
                        $state.go(destination);
                        
                    });
            }
            
            function clearUser() {
//                console.log('clear user, storage before:', storage);
                storage.reset();
                $timeout(function () {
//                console.log('clear user, after:', storage);
                }, 500);
            }
            

            function logout() {
                return $http.delete('/api/logout')
                    .then(function (response) {
                        clearUser();
//                        console.log('logged out. going to logout ok page');
                    })
                    .catch(function (error) {
                        console.error('logout errors:', error);
                    });
            }
            
            function getUser() {
                return storage.get('user');
            }
            

            function checkAuthentication(event, toState, toParams, fromState, fromParams) {
//                console.log(toState.name);
//                console.log('isLogged is', isLogged());
                if (toState.data.secure && !isLogged()) {
//                    console.log('triyn to get to secure state while not logged');
                    event.preventDefault();
                    
                    if (fromState.name === 'login') {
//                        console.log('jsut refreshing login page');
                        $state.reload();
                    } else {
                        desiredState = toState;
//                        console.log('will be redirected to' + desiredState.name + ' after login');
                        $state.go('public.login');
                    }
                }
            
            }
            function demoUserRestrictionAlert() {
//                console.log('this is demo user, no redirecting');
                var preset = $mdToast.simple()
                                .position('top right')
                                .hideDelay(30000)
                                .action('x')
                                .content("You are using demo account. As a demo user you can only examine interfaces and previously entered data, but cannot make any changes. To do so, simply logout and log in as yourself.");
//                console.log(preset);
                $mdToast.show(preset);
            }
            
            /* --------------- */
            
            storage = new StorageConstructor();
            
            return {
                reg: reg,
                login: login,
                logout: logout,
                getUser: getUser,
                clearUser: clearUser,
                //isLogged: isLogged,
                checkAuthentication: checkAuthentication,
                demoUserRestrictionAlert: demoUserRestrictionAlert

            };
            
        }]);


}(angular));