/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('UserModule');

    mdl.directive('userList', ['$location', '$state', 'APP_ROOT_FOLDER', 'User',
        function ($location, $state, ROOT, User) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'user/templates/list.html',
                scope: {},
                controller: function ($scope) {
                    $scope.ok = true;
                
                    $scope.user = User.$find(1);
                    
                    $scope.users = User.$collection();
                    $scope.users.$refresh();
                    
                    $scope.user.$then(function () {
//                        User.commonModelMethod();
//                        $scope.user.commonInstanceMethod();
//                        
//                        User.privateModelMethod();
//                        $scope.user.privateInstanceMethod();
//                        
//                        console.info('user is pending:', $scope.user.isPending());
//                        
                    });
                    
                    $scope.save = function () {
                        $scope.user.locals = {};
                        $scope.user.locals.isSaving = true;
                        console.log($scope.user);
                        $scope.user.$save()
                            .$then(function (response) {
                                console.log('saved', response);
//                                $scope.user.locals.isSaving = false;
                            
                            });
                    };
                },
                link: function () {
                }
            };
            
        }]);
    

    
    
}(angular));