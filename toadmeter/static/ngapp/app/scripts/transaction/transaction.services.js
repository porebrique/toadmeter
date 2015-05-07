/*global angular, console, Highcharts */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');
    

    mdl.factory('Transaction', ['RestmodTemplate', function (RestmodTemplate) {
        
        var mix = {
            $extend: {
//                Record: {
//                    getTag: function (tags) {
//                        var self = this,
//                            tag = null;
//                        
//                        ng.forEach(tags, function (item) {
//                            if (item.id === self.tag) {
//                                tag = item;
//                            }
//                        });
//                        console.log(tag);
//                        return tag;
//                        
//                    }
//                }
                Model: {
                    getCSVUploadUrl: function () {
                        return '/api/transactions/upload/';
                    }
                }
            }
        };
        return RestmodTemplate.provideModel('transactions').mix(mix);
    }]);
}(angular));