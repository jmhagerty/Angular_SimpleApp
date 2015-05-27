// Code goes here

(function(module) {

    var MainController = function($scope, $interval, $location) {
    
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
        if(countdownInterval){
          $interval.cancel(countdownInterval);
          $scope.countdown = null; // removes from screen
        }
        // move to another page and invoke the associated controller
        $location.path("/user/" + username);
        
      };
      
      $scope.username = "angular";
      $scope.countdown = 5;
      //startCountdown(); // un-comment to have countdown work
      
    }; // controller
    
    module.controller("MainController", MainController);
    
  //]); // iife

}(angular.module("githubViewer")));
