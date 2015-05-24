(function(){
  var app = angular.module("githubViewer", ['ngRoute']);
  
  app.config(function($routeProvider){
    .when("/main", {
      templateUrl: "main.html",
      controller: "MainController"
    })
    .otherwise({redirectTo: "/main"});
  });
  
}());
