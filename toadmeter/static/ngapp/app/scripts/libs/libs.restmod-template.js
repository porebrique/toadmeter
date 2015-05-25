/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LibsModule');

//    Usage: RestmodTemplate.provideModel('users', mixObject)
//    mixObject is optional and has to be identical to definition object for restmod.model().mix(def_object)
//   I mean, with $extend etc      
    
    mdl.factory('RestmodTemplate', ['$filter', 'restmod', function ($filter, restmod) {

        var defaultOptions;
        
        function provideDefaultOptions() {
            return {
                $extend: {
                    Record: {
                        isPending: function () {
                            return this.$pending.length > 0;
                        },
                        commonInstanceMethod: function () {
                            console.log('this is common instance method, called as $scope.something.instanceMethod()');
                        }
                    },
                    List: { // If using restmod < 1.1.5 the use Collection instead.
                        $orderBy: function (what) {
                            var ordered = $filter('orderBy')(this, what);
                            // reset the collection contents:
                            this.length = 0;
                            this.push.apply(this, ordered);
                            return this;
                        },
                        $where: function (params) {
//                            $filter('where')(response, {type: 'in'})
                            var ordered = $filter('where')(this, params);
                            // reset the collection contents:
                            this.length = 0;
                            this.push.apply(this, ordered);
                            return this;
                        }
                    },
                    Model: {
                        getOrCreate: function (id) {
                            var Model = this,
                                obj;
                            id = parseInt(id, 10);
                            if (!isNaN(id) && ng.isNumber(id)) {
//                                console.log('defined id', id);
                                obj = Model.$find(id);
                            } else {
                                obj = Model.$build();
                            }
                            return obj;
                        },
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
        }
        
        function provideModel(modelName, providedOptions) {
//            console.log(defaultOptions.$extend);
            var model = restmod.model(modelName),
                renderedOptions = ng.copy(provideDefaultOptions(model));
            
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