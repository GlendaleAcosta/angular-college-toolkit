angular.module("toolkitApp", [
    "ngRoute",
    "toolkitApp.home",
    "toolkitApp.todo",
    "toolkitApp.login"
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/'}); // Put a 404 here
}]);