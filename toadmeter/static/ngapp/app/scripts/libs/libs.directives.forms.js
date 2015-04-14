/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LibsModule');
    

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