/*global angular, console */

(function (ng) {
    'use strict';
    
    var app = ng.module('TransactionModule');
    
    app.config(['$stateProvider', function ($stateProvider) {
//        function tmpl(mdl, filename) {
//            return ROOT + mdl + '/templates/' + filename + '.html';
//        }
        

        $stateProvider
            .state('secure.incomes', {
                abstract: true,
                url: 'incomes/',
                template: '<ui-view />',
                data: {
                }
            })
            .state('secure.incomes.list', {
                url: 'list/',
                template: '<transactions-list type="in"/>',
                data: {
                    pageName: 'Список доходов'
                }
            })
            .state('secure.incomes.edit', {
                url: 'edit/:transaction_id',
                template: '<transaction-edit type="in"/>',
                data: {
                    pageName: 'Новая запись'
                }
            })
            .state('secure.costs', {
                abstract: true,
                url: 'costs/',
                template: '<ui-view/>',
                data: {
                }
            })
            .state('secure.costs.list', {
                url: 'list',
                template: '<transactions-list type="out"/>',
                data: {
                    pageName: 'Список расходов'
                }
            })
            .state('secure.costs.edit', {
                url: 'edit/:transaction_id',
                template: '<transaction-edit type="out"/>',
                data: {
                    pageName: 'Новая запись'
                }
            })
            .state('secure.costs.stats', {
                url: 'stats',
                template: '<transactions-stats type="out"/>',
                data: {
                    pageName: 'Статистика расходов'
                }
            });
    //            
    }]);
}(angular));