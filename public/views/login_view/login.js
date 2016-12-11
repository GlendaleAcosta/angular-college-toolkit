angular.module("toolkitApp.login", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl: 'views/login_view/login.html',
        controller: 'loginCtrl'
    });
}])

.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){

    $scope.submit = function(email, password){
        
        var user = {
            email: email,
            password: password
        }

        $http({
            method: 'POST',
            url: '/login',
            data: user
        }).then(function successCallback(response){
            $scope.msg = response.data.msg;
            var loginSuccess = response.data.loginSuccess;
            
            if (loginSuccess === true) {
                $location.path("/");
            }

        }, function errorCallback(response){

        });
    }
}]);