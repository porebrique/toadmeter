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
    

    /*
     * Usage: <span spinner-when="isSaving">original content</span>
     * isSaving: boolean
     * original content may be either plain text or html
     */
    mdl.directive('spinnerWhen', ['APP_ROOT_FOLDER',
        function (ROOT) {

            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    condition: '=spinnerWhen'
                },
                template: '<span class="fa fa-spinner fa-spin"></span><span class="original-content" ng-transclude></span>',
                link: function ($scope, elt, args) {
                    var spinner = ng.element(elt.children()[0]),
                        originalContent = ng.element(elt.children()[1]);
                    $scope.$watch(function () {
                        return $scope.condition;
                    }, function (newValue) {
                        if (newValue === true) {
                            spinner.css('opacity', 1);
                            originalContent.css('opacity', 0);
                        } else if (newValue === false) {
                            spinner.css('opacity', 0);
                            originalContent.css('opacity', 1);
                        }

                    });
                }

            };
        }]);
    
    
}(angular));