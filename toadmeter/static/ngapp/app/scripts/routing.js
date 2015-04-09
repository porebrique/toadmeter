/*global angular, console */

(function (ng) {
    'use strict';
    
    var app = ng.module('Toadmeter');
    
    app.config(['$urlRouterProvider', '$stateProvider', 'APP_ROOT_FOLDER', function ($urlRouterProvider, $stateProvider, ROOT) {
        function tmpl(mdl, filename) {
            return ROOT + mdl + '/templates/' + filename + '.html';
        }
        
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root', {
                url: '/',
                abstract: true,
                templateUrl: tmpl('global', 'root')
//                resolve: {
//                    configService: 'ConfigResource',
//                    CONFIG: function (configService) {
//                        return configService.get();
//                    }
//                }
            })
            .state('public', {
                abstract: true,
                parent: 'root',
                template: '<ui-view/>',
                data: {
                    secure: false
                }
            })
            .state('public.home', {
                url: '',
                templateUrl: tmpl('global', 'home')
            })
            .state('public.userlist', {
                url: 'userlist',
                template: '<user-list />'
            })
            .state('public.reg', {
                url: '',
                template: '<auth-registration />'
            })
            .state('public.login', {
                url: 'login',
//                templateUrl: tmpl('auth', 'login')
                template: '<auth-login/>'
            })
            .state('secure', {
                parent: 'root',
                template: '<ui-view/>',
                data: {
                    secure: true
                }
            })
            .state('secure.incomes', {
                url: 'incomes',
//                templateUrl: tmpl('transactions', 'incomes')
                template: '<transactions-list type="in"/>',
                data: {
                    pageName: 'Доходы'
                }
            })
            .state('secure.costs', {
                url: 'costs',
//                templateUrl: tmpl('transactions', 'costs')
                template: '<transactions-list type="out"/>',
                data: {
                    pageName: 'Расходы'
                }
            });
    //            
    }]);
}(angular));