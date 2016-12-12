angular.module("toolkitApp.todo", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/todo-list', {
        templateUrl: 'views/todo_view/todo.html',
        controller: 'todoCtrl',
        resolve: {
            authorizedAccess: function($location,authentication){
                if (authentication.getToken() === undefined) {
                    $location.path('/');
                }
            }
        }
    });
}])

.controller('todoCtrl', ['$scope', function($scope){

    
}]);