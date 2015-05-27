// Code goes here

(function(module) {
    var RepoController = function($scope, github, $routeParams) {
    
      var reponame = $routeParams.reponame;
      var username = $routeParams.username;
      
      var onRepo = function(data){
        $scope.repo = data;
      };
      
      var onError = function(reason){
        $scope.error = "Error fetching Data: " + reason.message;
      };
      
      github.getRepoDetails(username, reponame).then(onRepo, onError);

    }; // controller
    
    module.controller("RepoController", RepoController);
    

}(angular.module("githubViewer")));
