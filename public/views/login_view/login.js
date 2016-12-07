angular.module("toolkitApp.login", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl: 'views/login_view/login.html',
        controller: 'loginCtrl'
    });
}])

.controller('loginCtrl', ['$scope', function($scope){

}]);