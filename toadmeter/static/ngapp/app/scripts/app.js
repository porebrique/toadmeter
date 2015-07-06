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
        'restmod',
        'ngFileUpload',
        
        'LibsModule',
        'AuthModule',
        'UserModule',
        'TransactionModule',
        'TagModule'
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
    
                                 
    app.config(['$provide', '$httpProvider', 'restmodProvider', 'API_URL',  function ($provide, $httpProvider, restmodProvider, API_URL) {
        
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
//                        console.log('got 403');
                        if (Auth.getUser().username === 'demo') {
                            
                            Auth.demoUserRestrictionAlert();
                        } else {
                            Auth.clearUser();
                            $state.go('public.login');
                        }
                    }
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