angular.module('SoLApp.services', [])
.factory('login', ['$firebaseAuth', function ($firebaseAuth) {
  var loginRef = new Firebase('https://snackomlivet.firebaseio.com');
  return $firebaseAuth(loginRef);
}])
.factory('Tumblr', ['$http', function ($http) {
  var apiKey = 'xewG5GENHtuFF00MoMkrO1SG8VKqZhFEFcoKXwMBcLcUQJmp1M';
  var getPost = function (post) {
    var TumblrURL = 'http://api.tumblr.com/v2/blog/snackomlivet.tumblr.com/posts/text?api_key=' + apiKey;
    return $http.get(TumblrURL)
    .then(function (response) {
      return response.data;
    });
  };
  return {
    findPost: function (post) {
      return getPost(post);
    }
  };
}])
.factory('Post', ['$http', function ($http) {
  var apiKey = 'xewG5GENHtuFF00MoMkrO1SG8VKqZhFEFcoKXwMBcLcUQJmp1M';
  var specPost = function (thePost) {
    var postUrl = 'http://api.tumblr.com/v2/blog/snackomlivet.tumblr.com/posts/text?id=' + thePost + '&api_key=' + apiKey;
    return $http.get(postUrl)
    .then(function (postData) {
      return postData.data.response.posts;
    });
  };
  return {
    findPost: function (thePost) {
      return specPost(thePost);
    }
  };
}]);
