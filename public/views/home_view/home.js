angular.module("toolkitApp.home", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/home_view/home.html',
        controller: 'homeCtrl'
    });
}])

.controller('homeCtrl', ['$scope', 'loginData', 'authentication' , function($scope, loginData, authentication){
    $scope.msg = loginData.getMsg();

    $scope.logout = function(){
        
        authentication.logout();
        
        loginData.setMsg("You have successfully Logged out.");
        $scope.msg = loginData.getMsg();
    }
}]);