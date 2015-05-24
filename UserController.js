// Code goes here

(function(module) {
  //module.controller("mainController", ['$scope', '$http', '$interval',
//    var MainController = function(
//        $scope, $http, $interval, 
//        $log, $anchorScroll, $location) {
    var MainController = function(
        $scope, github, $interval, 
        $log, $anchorScroll, $location) {
    
      var onUserComplete = function(data){
        //$scope.user = response.data;
        $scope.user = data;
        //$http.get($scope.user.repos_url)
        github.getRepos($scope.user)
          .then(onRepos, onError);
      };
      
      var onRepos = function(data){
        //$scope.repos = response.data;
        $scope.repos = data;
        $location.hash("userDetails"); // id of html div in userdetails.html
        $anchorScroll(); // tell page to scroll to the location hash setting
      };
      
      var onError = function(response){
        $scope.error = "Error fetching Data: " + response.message;
        //$scope.user = false; // force falsy
      };
      
      var decrementCountdown = function(){
        $scope.countdown -= 1;
        if($scope.countdown < 1){
          $scope.search($scope.username);
        }
      };
      
      var countdownInterval = null;
      var startCountdown = function(){
        // call method every second, stop after 5 times
        countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
      };
      
      $scope.search = function(username){
        $log.info("Searching for " + username);
        //$http.get("https://api.github.com/users/" + username)
        github.getUser(username)
              .then(onUserComplete, onError);
        
        if(countdownInterval){
          $interval.cancel(countdownInterval);
          $scope.countdown = null; // removes from screen
        }
        
      };
      
      $scope.message = "GitHub Viewer";
      $scope.username = "angular";
      $scope.repoSortOrder = "-stargazers_count";
      $scope.countdown = 5;
      
      startCountdown();
      
    }; // controller
    
    module.controller("mainController", MainController);
    
  //]); // iife

}(angular.module("githubViewer")));
