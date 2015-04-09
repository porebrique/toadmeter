/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');
    
    mdl.factory('Tag', ['RestmodTemplate', function (RestmodTemplate) {
        return RestmodTemplate.provideModel('tags');
    }]);
    
    mdl.factory('Transaction', ['RestmodTemplate', function (RestmodTemplate) {
        
        var mix = {
            $extend: {
                Record: {
                    getTag: function (tags) {
                        var self = this,
                            tag = null;
                        
                        ng.forEach(tags, function (item) {
                            if (item.id === self.tag) {
                                tag = item;
                            }
                        });
                        console.log(tag);
                        return tag;
                        
                    }
                }
//                Model: {
//                    privateModelMethod: function () {
//                        console.log('this is private User model method');
//                    }
//                }
            }
        };
        return RestmodTemplate.provideModel('transactions');
    }]);
}(angular));