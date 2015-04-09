/*global angular */
(function(ng) {
    'use strict';

    ng.module('restmod').factory('DjangoRestfulFrameworkAPI', ['restmod', 'inflector', function (restmod, inflector) {

        return restmod.mixin('DefaultPacker', { // include default packer extension
            $config: {
                style: 'DjangoRestfulFrameworkAPI',
                primaryKey: 'id',
                jsonMeta: 'meta',
                jsonLinks: 'links',
                urlPrefix: '/api/' // or use setProperty('urlPrefix', '/api/v1') in a definition function
            },
            $hooks: {
                'before-request': function (req) {
                    // _req is just a $http configuration object.
                    req.url += '/';
                    
//                    req.headers = ng.extend(req.headers, { 'X-My-Header': 'imateapot!' });
                }
            },

            $extend: {
                // special snakecase to camelcase renaming
                Model: {
                    decodeName: inflector.camelize,
                    encodeName: function(_v) { return inflector.parameterize(_v, '_'); },
                    encodeUrlName: inflector.parameterize
                }
            }
        });

    }]);

}(angular));