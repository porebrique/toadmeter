/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('UserModule');

    mdl.factory('User', ['$http', 'RestmodTemplate', function ($http, RestmodTemplate) {
        var mix = {
            $extend: {
                Model: {
                    checkUsername: function (username) {
                        return $http({
                            url: this.$url() + '/check/',
                            method: 'GET',
                            params: {username: username}
                        })
                            .then(function (response) {
                                var result = {};
                                if (response.data > 0) {
                                    result.isFree = false;
                                    result.text = 'Username ' + '"' + username + '"' + ' is already taken';
                                } else {
                                    result.isFree = true;
                                    result.text = 'Username ' + '"' + username + '"' + ' is free';
                                }
                                return result;
                                
                            });
   
                    }
                }
            }
        };
//        return RestmodTemplate.provideModel('users', mix);
        return RestmodTemplate.provideModel('users').mix(mix);
    }]);

    
    
}(angular));