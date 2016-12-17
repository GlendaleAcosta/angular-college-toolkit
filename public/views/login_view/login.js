angular.module("toolkitApp.login", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl: 'views/login_view/login.html',
        controller: 'loginCtrl'
    });
}])

.controller('loginCtrl', ['$scope', '$http', '$location', 'loginData', 'authentication' ,function($scope, $http, $location, loginData, authentication){

    $scope.loginSuccess = null;

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
            $scope.loginSuccess = response.data.loginSuccess;
            
            if ($scope.loginSuccess === true) {
                loginData.setMsg(response.data.msg);  
                authentication.setToken(response.data.token);
                $location.path("/");

            }

        }, function errorCallback(response){

        });
    }
}]);