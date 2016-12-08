angular.module("toolkitApp.signUp", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/sign-up', {
        templateUrl: 'views/signUp_view/signUp.html',
        controller: 'signUpCtrl'
    });
}])

.controller('signUpCtrl', ['$scope', function($scope){

}]);