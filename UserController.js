// Code goes here

(function(module) {
    var UserController = function($scope, github, $routeParams) {
    
      var onUserComplete = function(data){
        //$scope.user = response.data;
        $scope.user = data;
        //$http.get($scope.user.repos_url)
        github.getRepos($scope.user).then(onRepos, onError);
      };
      
      var onRepos = function(data){
        //$scope.repos = response.data;
        $scope.repos = data;
      };
      
      var onError = function(response){
        $scope.error = "Error fetching Data: " + response.message;
        //$scope.user = false; // force falsy
      };
      

      $scope.username = $routeParams.username;
      $scope.repoSortOrder = "-stargazers_count";
      
      github.getUser($scope.username).then(onUserComplete, onError);

    }; // controller
    
    module.controller("UserController", UserController);
    

}(angular.module("githubViewer")));
