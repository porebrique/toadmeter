/*global angular */

/**
 * @ngdoc overview
 * @name ngappApp
 * @description
 * # ngappApp
 *
 * Main module of the application.
 */
(function (ng) {
    'use strict';
    ng
        .module('App', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngSanitize',
            'ngTouch'
        ]);

}(angular));