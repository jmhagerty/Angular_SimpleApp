(function(module) {
  
  var github = function($http){
    
    var getUser = function(username){
      // returns a promise to a promise to return data
      return $http.get("https://api.github.com/users/" + username)
                  .then( function(response){
                    return response.data;
                  });
    };
    
    var getRepos = function(user){
      // returns a promise to a promise to return data
      return $http.get(user.repos_url)
                  .then(function(response){
                    return response.data;
                  });
    };
    
    return {
      getUser: getUser,
      getRepos: getRepos
    };
    
  };
  
  module.factory("github", github);

}(angular.module("githubViewer")));