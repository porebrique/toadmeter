/*global angular, console, moment, Highcharts */
(function (ng) {
    'use strict';
    var mdl = ng.module('TransactionModule');

    mdl.controller('Transaction.StatsCtrl', ['$q', '$scope', '$state', 'Stat', 'Transaction', 'Tag', '$timeout',
        function ($q, $scope, $state, Stat, Transaction, Tag, $timeout) {

            function redrawGraphs() {
                $scope.pieChartConfig = Stat.getChartConfig('pie', $scope.stats);
                $scope.columnChartConfig = Stat.getChartConfig('column', $scope.stats);
            }
            
            Stat.$collection({type: $scope.type})
                .$refresh()
                .$then(function (response) {
                    ng.forEach(response, function (tag) {
                        tag.enabled = true;
                    });
//                    $scope.stats = Stat.prepareStats(response);
                    $scope.stats = response;
//                    console.log($scope.stats);
                    Stat.updateData($scope.stats);
                    redrawGraphs();
                });
            
            
            $scope.toggleTag = function (tag) {
                console.log('toggle tag');
                Stat.updateData($scope.stats);
                redrawGraphs();
            };
        }]);

    mdl.controller('Transaction.EditCtrl', ['$q', '$scope', '$state', '$stateParams', '$filter', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope, $state, $stateParams, $filter, Auth, Transaction, Tag) {

            var listUrl = {
                "in": 'secure.incomes.list',
                "out": 'secure.costs.list'
            };
//            console.log($scope.type);
            
            $scope.getSelectDateText = function () {
                return $scope.datetype === 'select' ? $filter('date')($scope.transaction.date, 'dd.MM.yyyy') : 'Выбрать дату';
            };
            $scope.setDate = function (what) {
                
                switch (what) {
                case 'yesterday':
                    $scope.transaction.date = moment().subtract(1, 'days');
                    $scope.datetype = 'yesterday';
                    break;
                case 'today':
                    $scope.transaction.date = moment();
                    $scope.datetype = 'today';
                    break;
                case 'select':
                    $scope.datetype = 'select';
                    $scope.datepicker = false;
                    break;
                }
            };
            
            $scope.appendDigit = function (what) {
                var size = $scope.transaction.size;
                size = ng.isUndefined(size) ? '' : size.toString();
                if (ng.isNumber(what)) {
                    size = size + what.toString();
                } else {
                    size = size.substr(0, size.length - 1);
                }
                $scope.transaction.size = size;
            };
            
            $scope.addTag = function () {
                if ($scope.newTagText && $scope.newTagText.length > 0) {
                    var newTag = $scope.tags.$create({text: $scope.newTagText, type: $scope.type});
                    $scope.newTagText = null;
                }
            };
            
            $scope.save = function () {
                $scope.transaction.type = $scope.type;
                $scope.transaction.date = moment($scope.transaction.date).format('YYYY-MM-DD');
                $scope.transaction
                    .$save()
                    .$then(function () {
                        $state.go(listUrl[$scope.type]);
                    });
            };
            
            $scope.remove = function () {
                $scope.transaction.$destroy()
                    .$then(function () {
                        $state.go(listUrl[$scope.type]);
                    });
            };
            
            /* ----------------------------------------- */
            
            $scope.transaction = Transaction.getOrCreate($stateParams.transaction_id);
            $scope.transaction.$then(function (response) {
                if ($scope.transaction.date) {
                    $scope.setDate('select');
                } else {
                    $scope.setDate('today');
                }
            });
            $scope.tags = Tag.$collection({type: $scope.type});
            $scope.tags.$refresh();

        }]);


    mdl.controller('Transaction.PeriodFilterCtrl', ['$q', '$scope', '$state', '$filter', 'Transaction', 'Tag',
        function ($q, $scope, $state, $filter, Transaction, Tag) {
   
            function resetPeriod() {
                $scope.period.code = 'current';
                $scope.period.data.month = null;
                $scope.period.data.year = moment().year();
            }
            
            function buildFilter() {
                var now = 2015,
                    year = moment(),
                    month,
                    years = [],
                    months = [],
                    count = 0;

                $scope.period = {
                    variants: [
                        ['last', 'Last month'],
                        ['current', 'Current month'],
                        ['custom', 'Choose month']
                    ],
                    data: {},
                    options: {}
                };
                
                resetPeriod();
                
                do {
                    years.push(year.year());
                    year.subtract(1, 'year');
//                    console.log('adding', year.year(), 'now is', now);
                } while (year.year() >= now);
                do {
                    count += 1;
                    months.push(moment().month(count).format("MMMM"));
                } while (count < 12);
//                years.push(2011);
                $scope.period.options.years = years;
                $scope.period.options.months = months;
                
            }
            
            buildFilter();
            
            $scope.setPeriod = function (code) {
                if (code !== $scope.period.code) {
                    var request_period;
                    $scope.period.code = code;
                    if (code === 'last' || code === 'current') {
                        $scope.getOtherMonth(code);
                    }
                }
            };
            
            $scope.$watch('period.data', function (newValue) {
                if ($scope.period.code === 'custom' && newValue.year && newValue.month) {
                    $scope.getOtherMonth('custom');
                }
            }, true);
            
            $scope.getOtherMonth = function (request) {
                var period,
                    lastmonth;
//                console.log(request);
                
                switch (request) {
                case 'last':
                    lastmonth = moment().subtract(1, 'month');
                    period = (lastmonth.month() + 1) + '.' + lastmonth.year();
                    break;
                case 'current':
                    period = null;
                    resetPeriod();
                    break;
                case 'custom':
//                    console.log($scope.period.data);
                    console.log($scope.period.data.month, typeof $scope.period.data.month);
                    period = parseInt($scope.period.data.month, 10) + 1 + '.' + $scope.period.data.year;
                    break;
                }
                console.log(period);
                $scope.list.$refresh({period: period});
            };
                    
        }]);
    
    mdl.controller('Transaction.ListCtrl', ['$q', '$scope', '$state', '$filter', 'Auth', 'Transaction', 'Tag',
        function ($q, $scope, $state, $filter, Auth, Transaction, Tag) {
            
            Transaction
                .$collection({
                    type: $scope.type
                })
                .$refresh()
                .$then(function (response) {
//                    $scope.transactions = $filter('unique')(response, 'date');
                    $scope.transactions = response;
                });
            $scope.tags = Tag.$collection();
//            $scope.transactions.$refresh();
            $scope.tags.$refresh();
            $scope.addButtonUrl = $scope.type === 'in' ? 'secure.incomes.edit' : 'secure.costs.edit';
            
            
            $scope.getSumFor = function (date) {
                var sum = 0,
                    selection = $filter('where')($scope.transactions, {date: date});
                ng.forEach(selection, function (ta) {
                    sum += ta.size;
                });
//                console.log(sum);
                return sum;
            };
            
            $scope.getEditUrlFor = function (ta) {
                var url = $scope.addButtonUrl + '({transaction_id: %id%})';
                url = url.replace('%id%', ta.id);
                return url;
            };
            
            $scope.toggle = function (day) {
                if ($scope.openDay === day) {
                    $scope.openDay = null;
                } else {
                    $scope.openDay = day;
                }
            };

            
            $scope.getTag = function (tag_id) {
                var tag = null;
                if ($scope.tags.length > 0) {
                    tag = Tag.getFromCollection($scope.tags, tag_id);
                }
                return tag;
            };


        }]);


}(angular));