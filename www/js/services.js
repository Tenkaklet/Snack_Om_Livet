angular.module('SoLApp.services', [])
.factory('login', ['$firebaseAuth', function ($firebaseAuth) {
  var loginRef = new Firebase('https://snackomlivet.firebaseio.com');
  return $firebaseAuth(loginRef);
}])
.factory('Wordpress', ['$http', function ($http) {

  var getPost = function (post) {
    var BlogUrl = 'http://www.tenkaklet.com/blog/tag/snack-om-livet/?json=1';
    return $http.get(BlogUrl)
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
  var specPost = function (thePost) {
    var postUrl = 'http://www.tenkaklet.com/blog/?json=get_post&post_id=' + thePost;
    return $http.get(postUrl)
    .then(function (postData) {
      return postData.data.post;
    });
  };
  return {
    findPost: function (thePost) {
      return specPost(thePost);
    }
  };
}])
.factory('User', ['$firebaseAuth', function ($firebaseAuth) {
  var userRef = new Firebase('https://snackomlivet.firebaseio.com/users');
  return userRef;
}]);
