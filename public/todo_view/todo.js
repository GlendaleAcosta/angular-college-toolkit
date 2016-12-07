angular.module("toolkitApp.todo", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/todo-list', {
        templateUrl: 'todo_view/todo.html',
        controller: 'todoCtrl'
    });
}])

.controller('todoCtrl', ['$scope', function($scope){

}]);