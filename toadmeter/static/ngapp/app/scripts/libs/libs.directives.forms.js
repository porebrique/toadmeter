/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LibsModule');
    
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