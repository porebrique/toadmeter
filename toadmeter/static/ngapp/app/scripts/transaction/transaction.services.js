/*global angular, console, Highcharts */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');
    
    
    mdl.factory('Stat', ['RestmodTemplate', function (RestmodTemplate) {
        
//        function thereAreStats(stats) {
//        
//        }
        function mapSeries(stats) {
            var series = [],
                sum = 0;
            ng.forEach(stats, function (tag) {
                if (!ng.isDefined(tag.$enabled)) {
                    tag.$enabled = true;
                }
                if (tag.$enabled) {
                    series.push([tag.text, tag.sum]);
                    sum = sum + tag.sum;
                }
            });
            return {
                total: sum,
                series: series
            };
        }
        
        function getTotalSum(stats) {
        
        }
        
        function getChartConfig(stats) {
            var data = mapSeries(stats);
            
            return {
                options: {
                    title: {text: 'Сумма: ' + data.total},
//                    title: null,
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

                size: {
//                    height: 300,
                    height: 400,
                    width: 500
                    
                },
                
                //Series object (optional) - a list of series using normal highcharts series options.
                series: [{
                    name: 'Сумма',
                    data: data.series
//                    data: stats

                }]


            };

        }
        
        
        var mix = {
            $extend: {
                Model: {
                    getChartConfig: getChartConfig
//                    mapSeries: mapSeries
                }
            }
        };
        
        return RestmodTemplate.provideModel('stats').mix(mix);
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