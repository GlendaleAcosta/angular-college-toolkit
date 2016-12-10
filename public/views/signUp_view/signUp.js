angular.module("toolkitApp.signUp", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/sign-up', {
        templateUrl: 'views/signUp_view/signUp.html',
        controller: 'signUpCtrl'
    });
}])

.controller('signUpCtrl', ['$scope', '$http', function($scope, $http){

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
            console.log(response.data.msg);
            $scope.msg = response.data.msg;
        }, function errorCallback(response){

        });
    }


}]);