/*global angular, console, Highcharts */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');
    
    
    mdl.factory('Stat', ['RestmodTemplate', function (RestmodTemplate) {
        
        function thereAreStats(stats) {
        
        }
        function mapSeries(stats) {
            var series = [];
            ng.forEach(stats, function (tag) {
                if (tag.sum > 0) {
                    series.push([tag.text, tag.sum]);
                }
            });
            return series;
        }
        
        function getChartConfig(stats) {
            return {
                options: {
//                        title: {text: 'Browser market shares at a specific website, 2014'},
                    title: null,
                    tooltip: {pointFormat: '<strong>{point.y}</strong>, ({point.percentage:.1f}%)'},
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.y}',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    chart: {
                        type: 'pie'
                    }
                },

                //The below properties are watched separately for changes.

                //Series object (optional) - a list of series using normal highcharts series options.
                series: [{
                    name: 'Сумма',
                    data: mapSeries(stats)

                }],
                size: {
                    width: 400,
                    height: 300
                }

            };

        }
        
        
        var mix = {
            $extend: {
                Model: {
                    getChartConfig: getChartConfig,
                    mapSeries: mapSeries
                }
            }
        };
        
        return RestmodTemplate.provideModel('stats').mix(mix);
    }]);
    
    mdl.factory('Tag', ['RestmodTemplate', function (RestmodTemplate) {
        return RestmodTemplate.provideModel('tags');
    }]);
    
    mdl.factory('Transaction', ['RestmodTemplate', function (RestmodTemplate) {
        
        var mix = {
            $extend: {
                Record: {
                    getTag: function (tags) {
                        var self = this,
                            tag = null;
                        
                        ng.forEach(tags, function (item) {
                            if (item.id === self.tag) {
                                tag = item;
                            }
                        });
                        console.log(tag);
                        return tag;
                        
                    }
                }
//                Model: {
//                    privateModelMethod: function () {
//                        console.log('this is private User model method');
//                    }
//                }
            }
        };
        return RestmodTemplate.provideModel('transactions');
    }]);
}(angular));