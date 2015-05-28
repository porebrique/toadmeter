/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LibsModule');
    
    mdl.directive('interactiveHint', ['$interpolate', '$parse', '$timeout', function ($interpolate, $parse, $timeout) {
        return {
            restrict: 'E',
            template: '<span class="interactive-hint {{hintClass}} {{loadingClass}}"><span class="fa fa-spinner fa-spin"></span><span class="text">{{hintText}}</span></span>',
            link: function ($scope, elt, attrs) {
                
                var watch = $parse(attrs.watch),
                    execute = $parse(attrs.execute)($scope),
                    delayedCheck;
                
                
                
                
                $scope.$watch(function () {
                    return watch($scope);
                }, function (newValue) {
                    if (newValue) {
                        if (delayedCheck) {
                            $timeout.cancel(delayedCheck);
                        }
                        delayedCheck = $timeout(function () {
                            $scope.loadingClass = 'is-loading';
                            execute(newValue)
                                .then(function (result) {
                                    $scope.hintText = result.text;
                                    $scope.hintClass = result.isFree ? 'ok' : 'error';
                                    $scope.loadingClass = null;
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    $scope.hintText = error.config.url + ': ' + error.status + ' ' + error.statusText;
                                    $scope.loadingClass = null;
                                });
                            
                        }, 500);

                    }
                });
                
            }
        };
    }]);
    
    mdl.directive('focusWhen', ['$interpolate', '$parse', '$timeout', function ($interpolate, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, elt, attrs) {
                
                var when = $parse(attrs.focusWhen);

//                attrs.$observe('focusWhen', function (newValue) {
//                    if (newValue === 'true') {
//                        $timeout(function () {
//                            elt[0].focus();
//                        }, 50);
//                    }
//                });
                
                $scope.$watch(function () {
                    return when($scope);
                }, function (newValue) {
                    if (newValue) {
                        $timeout(function () {
                            elt[0].focus();
                        }, 50);
                    }
                });
            }
        };
    }]);
    
    mdl.directive('onEnter', [function () {
        return {
            restrict: 'A',
            link: function ($scope, elt, attrs) {
                elt.on('keypress', function (e) {
//                    console.log(e.ctrlKey, e);
                    if (e.keyCode === 13) {
//                        console.log('enter!');
                        $scope.$apply(function () {
                            $scope.$eval(attrs.onEnter);
                            elt.blur();
                        });
                    }
                });
            }
        };
    }]);

}(angular));