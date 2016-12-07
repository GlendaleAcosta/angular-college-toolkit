angular.module("toolkitApp.home", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'home_view/home.html',
        controller: 'homeCtrl'
    });
}])

.controller('homeCtrl', ['$scope', function($scope){

}]);