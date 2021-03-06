angular.module("toolkitApp.signUp", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/sign-up', {
        templateUrl: 'views/signUp_view/signUp.html',
        controller: 'signUpCtrl'
    });
}])

.controller('signUpCtrl', ['$scope', '$http', function($scope, $http){

    $scope.msg = false;
    $scope.signUpSuccess = null;

    $scope.submit = function(email, password){
        
        var user = {
            email: email,
            password: password
        }

        $http({
            method: 'POST',
            url: '/sign-up',
            data: user
        }).then(function successCallback(response){
            
            $scope.msg = response.data.msg;
            $scope.signUpSuccess = response.data.signUpSuccess;

            $scope.email = "";
            $scope.password = "";
            
        }, function errorCallback(response){

        });
    }


}]);