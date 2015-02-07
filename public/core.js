var meanTodo = angular.module('meanTodo', []);

function mainController($scope, $http){
  $scope.formData = {};

  // display all todos on homepage
  $http.get('/api/todos')
    .success(function(data) {
        $scope.todos = data;
        console.log(data);
    });
    .error(function(data) {
        console.log('Error: ' + data);
        ;
    }); // close $http.get

    // send text from form submit to node API
    $scope.createTodo = function {
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {};  // clear form after submit
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }; // close $scope.createTodo

    // delete todo
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }; // close $scope.deleteTodo
}; //close mainController