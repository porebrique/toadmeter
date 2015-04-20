/*global angular, console */
(function (ng) {
    'use strict';
    
    var mdl = ng.module('AuthModule');

    mdl.factory('Auth', ['$http', '$rootScope', '$cookieStore', '$state', '$timeout', '$localStorage',
        function ($http, $rootScope, $cookieStore, $state, $timeout, $localStorage) {
//            console.log('auth service');
            var storage,
                desiredState = null;
            
            
            function StorageConstructor() {
                var self = this,
                    storageService = $localStorage,
                    storage;
                
                if (ng.isUndefined(storageService.auth)) {
                    storageService.auth = {};
                }
                
                storage = storageService.auth;
                
                self.get = function (what) {
                    if (ng.isUndefined(storage[what])) {
                        storage[what] = false;
                    }
                    return storage[what];
                };
                
                self.set = function (name, value) {
                    storage[name] = value;
                };
                
                self.reset = function () {
                    delete storageService.auth;
                    delete $rootScope.auth;
                };
            
            }
            
            function isLogged() {
                return storage.get('isLogged');
            }
                        
            
            /*  Public methods  */
            
            function login(user) {
                return $http.post('/api/login', user)
                    .then(function (response) {
                        storage.set('isLogged', true);
                        storage.set('user', response.data.user);
                        var destination = desiredState ? desiredState.name : 'secure.incomes.list';
                        desiredState = null;
                    
                        $state.go(destination);
                    });
            }
            
            function clearUser() {
                storage.reset();
            }
            
            function logout() {
                return $http.delete('/api/logout')
                    .then(function (response) {
                        clearUser();
//                        console.log('logged out. going to logout ok page');
                    })
                    .catch(function (error) {
                        console.log('logout errors:', error);
                    });
            }
            
            function getUser() {
                return storage.get('user');
            }
            

            function checkAuthentication(event, toState, toParams, fromState, fromParams) {
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
            
            /* --------------- */
            
            storage = new StorageConstructor();
            
            return {
                login: login,
                logout: logout,
                getUser: getUser,
                clearUser: clearUser,
                //isLogged: isLogged,
                checkAuthentication: checkAuthentication
            };
            
        }]);


}(angular));