/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LibsModule');
    

    mdl.directive('lbSidenavSwitch', ['$mdSidenav', function ($mdSidenav) {
        return {
            restrict: 'A',
            link: function ($scope, elt) {
                elt.on('click', function () {
                    $mdSidenav('left').toggle();
                });
            }
        };
    }]);
    
}(angular));