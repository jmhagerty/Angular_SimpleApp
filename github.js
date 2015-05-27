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
    
    var getRepoDetails = function(username, reponame){
      // https://api.github.com/repos/angular/angular/contributors
      var repo;
      var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
      
      // Chained promises
      return $http.get(repoUrl)
                  .then(function(response){
                    repo = response.data;
                    return $http.get(repoUrl + "/contributors");
                  })
                  .then(function(response){
                    repo.contributors = response.data;
                    return repo;
                  });
    };
    
    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails
    };
    
  };
  
  module.factory("github", github);

}(angular.module("githubViewer")));