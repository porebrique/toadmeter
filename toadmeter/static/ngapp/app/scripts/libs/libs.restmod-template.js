/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LibsModule');

//    Usage: RestmodTemplate.provideModel('users', mixObject)
//    mixObject is optional and has to be identical to definition object for restmod.model().mix(def_object)
//   I mean, with $extend etc      
    
    mdl.factory('RestmodTemplate', ['restmod', function (restmod) {

        var defaultOptions;
        
        defaultOptions = {
            $extend: {
                Record: {
                    isPending: function () {
                        return this.$pending.length > 0;
                    },
                    commonInstanceMethod: function () {
                        console.log('this is common instance method, called as $scope.something.instanceMethod()');
                    }
                },
                Model: {
                    getFromCollection: function (collection, id) {
                        var answer = null;
                        ng.forEach(collection, function (item) {
                            if (item.id === id) {
                                answer = item;
                            }
                        });
                        return answer;
                                   
                    },
                    commonModelMethod: function () {
                        console.log('this is common model method,  called as ModelName.instanceMethod() where it is injected');
                    }
                }
            }
        };
        
        function provideModel(modelName, providedOptions) {
//            console.log(defaultOptions.$extend);
            var model = restmod.model(modelName),
                renderedOptions = ng.copy(defaultOptions);
            
            if (providedOptions) {
                ng.extend(renderedOptions.$extend.Model, providedOptions.$extend.Model);
                ng.extend(renderedOptions.$extend.Record, providedOptions.$extend.Record);
            }
            
//            console.log(defaultOptions.$extend);
//            console.log('rendered options', renderedOptions);
            model.mix(renderedOptions);
            return model;
        }
        
        
        return {
            provideModel: provideModel
        };
    }]);

    
    
}(angular));