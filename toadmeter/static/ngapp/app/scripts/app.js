/*global angular, console */

/**
 * @ngdoc overview
 * @name ngappApp
 * @description
 * # ngappApp
 *
 * Main module of the application.
 */
(function (ng) {
    'use strict';
    var app = ng.module('Toadmeter', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngSanitize',
        'ngTouch',
        
        'ngStorage',

        'angular.filter',
        'ngMaterial',
        'ui.router',
        'mdDateTime',
        
        'highcharts-ng',

        'restangular',
        'restmod',
        
        'LibsModule',
        'AuthModule',
        'UserModule',
        'TransactionModule'
    ]),
        $restmodProvider;

    app.appPath = '/static/ngapp/app/';
    app.constant('PROJECT_ROOT_FOLDER', app.appPath);
    app.constant('APP_ROOT_FOLDER', app.appPath + 'scripts/');
    
    app.constant('API_URL', '/api/');

    app.config(function ($mdThemingProvider) {
//        http://www.materialpalette.com/blue-grey/teal
//        $mdThemingProvider.theme('default')
//            .primaryPalette('blue-grey')
//            .accentPalette('teal');
    });
    
                                 
    app.config(['$provide', '$httpProvider', 'RestangularProvider', 'restmodProvider', 'API_URL',  function ($provide, $httpProvider, RestangularProvider, restmodProvider, API_URL) {
        
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        

        $restmodProvider = restmodProvider;
        
//        Restmod config 
        
//        restmodProvider.rebase('DjangoRestfulFrameworkAPI'); // given the mixin is called MyStyleApi
//        restmodProvider.rebase({
//            $config: {
//                style: 'DRFAPI',
//                primaryKey: 'id',
//                urlPrefix: '/api/' // or use setProperty('urlPrefix', '/api/v1') in a definition function
//            },
//            $hooks: {
//                'after-request-error': function (response) {
////                    this.partCount = this.parts.length;
////                    console.log('before save', this.locals);
//                    console.log('after req', response);
//                    if (response.status === 403) {
////                        Auth.clearUser();
//                        
//                    }
////                    delete this.locals;
//                },
//                'before-request': function (req) {
//                    req.url += '/';
//                }
//            }
//        });
        
        // --- Restangular config
        function addLocals(response) {
            var newResponse = response;

            if (ng.isArray(newResponse)) {
                ng.forEach(newResponse, function (item) {
                    item.local = {};
                });
            } else if (ng.isObject(newResponse)) {
                newResponse.local = {};
            }
            return newResponse;
        }

        function removeLocals(elt, operation) {
            if (operation === 'post' || operation === 'put') {
                delete elt.local;
            }
            return elt;
        }
        
        function getPaginatedList(data, operation) {
            var result = data;
            if (operation === 'getList') {
                if (!ng.isArray(data)) {
                    result = ng.copy(data.results);
                    delete data.results;
                    result.paginator = data;
                }
            }
            return result;
        }

        RestangularProvider.setResponseExtractor(addLocals);
        RestangularProvider.addResponseInterceptor(getPaginatedList);
        RestangularProvider.addRequestInterceptor(removeLocals);
        RestangularProvider.setRequestSuffix('/');
        RestangularProvider.setBaseUrl(API_URL);
        // --- /restangular
        
    }]);

    
    
    app.run(['$rootScope', '$state', '$stateParams', '$http', '$cookies', 'Auth', function ($rootScope, $state, $stateParams, $http, $cookies, Auth) {
        
        // django csrf token, and it would be good to get rid of native $http and use only restangular
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        
        $restmodProvider.rebase({
            $config: {
                style: 'DRFAPI',
                primaryKey: 'id',
                urlPrefix: '/api/' // or use setProperty('urlPrefix', '/api/v1') in a definition function
            },
            $hooks: {
                'after-request-error': function (response) {
                    if (response.status === 403) {
                        Auth.clearUser();
                        $state.go('public.login');
                    }
//                    delete this.locals;
                },
                'before-request': function (req) {
                    req.url += '/';
                }
            }
        });
//        
//        Restangular.setDefaultHeaders({
//            'X-CSRFToken': $cookies.csrftoken
//        });
        
        
        // Injecting $state and $stateParams to scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$rootScope.Auth = Auth;
        
        $rootScope.$on('$stateChangeStart', function () {
//            GlobalHttpErrorsStorage.clear();
        });
        
        $rootScope.$on('$stateChangeSuccess', function (wtf, state) {
            if (state.data) {
                $rootScope.currentPageName = state.data.pageName;
            }
        });
        
        // just errors output
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, errors) {
                console.log('STATE CHANGE ERROR', errors);
                //event.preventDefault();
                //$state.go(toState);
            });
    }]);

    
}(angular));