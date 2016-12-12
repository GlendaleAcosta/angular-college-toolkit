angular.module("toolkitApp", [
    "ngRoute",
    "toolkitApp.home",
    "toolkitApp.todo",
    "toolkitApp.login",
    "toolkitApp.signUp"
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/'}); // Put a 404 here
}])

.service('loginData', function(){
    this.msg = false;

    this.getMsg = function(){
        return this.msg;
    }
    this.setMsg = function(msg){
        this.msg = msg;
    }

})

.service('authentication', ['$window' , function($window){

    this.getToken = function(){
        return $window.localStorage['c-toolkit-token'];
    }

    this.setToken = function(token) {
        $window.localStorage['c-toolkit-token'] = token;
    }

    this.logout = function(){
        $window.localStorage.removeItem('c-toolkit-token');
    }
    
}]);

