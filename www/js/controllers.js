angular.module('SoLApp.controllers', [])

.controller('MenuCtrl', ['$scope', '$ionicModal', '$timeout', 'login', function($scope, $ionicModal, $timeout, login) {

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    login.$authWithPassword({
      'email': $scope.loginData.email,
      "password": $scope.loginData.password
    })
    .then(function (authData) {

      $scope.loginData = '';
      $scope.closeLogin();
    })
    .catch(function(error) {

      $scope.errorMessages = 'The wrong password or e-mail has been used';
    });

    // login.$createUser({
    //   email    : "max@max.com",
    //   password : "max"
    // })
    // .then(function (authData) {
    //   var userRef = new Firebase('https://snackomlivet.firebaseio.com');
    //   userRef.child('users').child(authData.uid).set({
    //     admin: true,
    //     name: 'Max Carlquist'
    //   });
    // })
    // .catch(function (oops) {
    //   console.log(oops);
    // });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  };

  $scope.logout = function () {
    login.$unauth();
  };
  login.$onAuth(function (res) {
    if (res) {
      $scope.loggedIn = true;
      $scope.needLogin = false;
    } else {
      $scope.needLogin = true;
      $scope.loggedIn = false;
    }
  });

}])

.controller('BlogFeedCtrl',[ '$scope', 'login', 'Wordpress',function($scope, login, Wordpress) {

  Wordpress.findPost()
  .then(function(res) {
    $scope.posts = res.posts;
  });

  $scope.refresh = function () {
    Wordpress.findPost()
    .then(function (res) {
      $scope.posts = res.posts;
    })
    .finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };


}])

.controller('BlogPostCtrl', ['$scope', '$stateParams', 'Post', function($scope, $stateParams, Post) {
  $scope.Id = $stateParams.postId;
  Post.findPost($stateParams.postId)
  .then(function(res) {
    var postHeader = document.getElementById('PostHeader');
    var headerImage = res.thumbnail_images.full.url;
    var image = 'url(' + headerImage + ')';
    postHeader.style.backgroundImage = image;
    $scope.post = res;
    var firstName = res.author.first_name;
    var secondName = res.author.last_name;
    $scope.authorName = firstName + ' ' + secondName;

    if ($scope.authorName === 'Max Carlquist') {
      $scope.avatarImage = 'http://www.tenkaklet.com/snack/images/max.jpg';
    } else if ($scope.authorName === 'Daniel Arthursson') {
      $scope.avatarImage = 'http://www.tenkaklet.com/snack/images/dan2.jpg';
    } else {

    }
  });
}]);
