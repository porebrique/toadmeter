/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('TagModule');
    
    
    mdl.factory('Tag', ['RestmodTemplate', function (RestmodTemplate) {
        
//        var mix = {
//            $extend: {
//                Model: {
//                    annotateSum: annotateSum
//                }
//            }
//        };
        
        return RestmodTemplate.provideModel('tags');
    }]);
        

    mdl.factory('Statistics', ['$filter', 'RestmodTemplate', function ($filter, RestmodTemplate) {
        
        var mix,
            stored_data = null,
            mapped_data = false;
        
        
        function annotateSum(tags_input, transactions) {
            var tags = ng.copy(tags_input);
            
            ng.forEach(tags, function (tag) {
//                console.log('annotating', tag.id, tag.text);
                tag.sum = 0;
                ng.forEach(transactions, function (transaction) {
                    if (transaction.tag === tag.id) {
                        tag.sum = tag.sum + transaction.size;
                    }
                });
                tag.enabled = true;
//                if (tag.sum > 0) {
//                    tag.enabled = true;
//                }
//                console.log(tag.text, ': получилось ', tag.sum);
                
            });
//            tags = $filter('pick')(tags, 'sum > 0');
            tags = $filter('orderBy')(tags, 'sum', true);
            return tags;
        }
        function prepareStats(stats) {
            var processedStats = ng.copy(stats);
            console.log('preparing stats...');
            ng.forEach(processedStats, function (tag) {
                if (!ng.isDefined(tag.enabled)) {
                    tag.enabled = true;
//                    console.log('changing someth');
                }
            });
            return processedStats;
        }
        
        function mapSeries(stats, type) {
//            console.log('mapping data', stats);
            var series = [],
                sum = 0;
            ng.forEach(stats, function (tag) {
                if (!ng.isDefined(tag.enabled)) {
                    tag.enabled = true;
//                    console.log('changing someth');
                }
//                console.log('inside mapping loop');
                if (tag.enabled && tag.sum > 0) {
                    series.push([tag.text, tag.sum]);
                    sum = sum + tag.sum;
                }
            });
//            stats = statsCopy;
            return {
                total: sum,
                series: series
            };
        }
        
        function updateData(newData) {
            stored_data = ng.copy(newData);
            mapped_data = mapSeries(ng.copy(newData));
//            stored_data = newData;
//            console.log('stored_data updated to', stored_data);
            
        }
        
        
        function getChartConfig(chartType, unmappedData) {
//            console.log(mapped_data);
//            var data = mapSeries(unmappedData, chartType),
            var data = mapped_data,
                config = {
                    options: {
                        chart: {
                            type: function () {
                                console.warn('No chart type set!');
                                return null;
                            }
                        },
                        title: {text: 'Сумма: ' + data.total},
                        xAxis: {
                            type: 'category',
                            labels: {
                                rotation: -45,
                                style: {
    //                                fontSize: '13px'
                                }
                            }
                        },
                        yAxis: {title: null},
                        legend: {enabled: false},
                        tooltip: {
                            pointFormat: 'Всего <b>{point.y}</b>'
                        }
                    },
                    size: {
                        height: 400,
                        width: 500

                    },
                    series: [{
                        name: 'Сумма',
                        data: data.series
                    }]
                
                };
            
            switch (chartType) {
            case 'column':
                config.options.chart.type = 'column';
                config.series.dataLabels = {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px'
                    }
                };
                break;
            case 'pie':
                config.options.chart.type = 'pie';
                config.options.plotOptions = {
                    pie: {
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}'
                        }
                    }
                };
                break;
            default:
                console.error('Unsupported chart type:', chartType);
                break;
            }
            return config;
        }
        
        mix = {
            $extend: {
                Model: {
                    annotateSum: annotateSum,
                    prepareStats: prepareStats,
                    updateData: updateData,
                    getChartConfig: getChartConfig
                }
            }
        };
        
        return RestmodTemplate.provideModel('stats').mix(mix);
    }]);

}(angular));