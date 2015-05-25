/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');
    
    
    mdl.factory('Tag', ['RestmodTemplate', function (RestmodTemplate) {
        
//        var mix = {
//            $extend: {
//                Model: {
//                    annotateSum: annotateSum
//                }
//            }
//        };
        
        return RestmodTemplate.provideModel('tags');
    }]);
        


}(angular));