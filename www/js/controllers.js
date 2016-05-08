angular.module('SoLApp.controllers', [])

.controller('MenuCtrl', ['$scope', '$ionicModal', '$timeout', 'login', function($scope, $ionicModal, $timeout, login) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
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
console.log(login);
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    login.$authWithPassword({
      'email': $scope.loginData.email,
      "password": $scope.loginData.password
    })
    .then(function (authData) {
      console.log(authData);
      $scope.loginData = '';
      $scope.closeLogin();
    })
    .catch(function(error) {
      console.log(error);
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
    console.log('logged out!');
  };
  login.$onAuth(function (res) {
    if (res) {
      console.log('user logged in with: ' , res.uid);
      $scope.loggedIn = true;
      $scope.needLogin = false;
    } else {
      console.log('not logged in');
      $scope.needLogin = true;
      $scope.loggedIn = false;
    }
  });

}])

.controller('BlogFeedCtrl',[ '$scope', 'login', 'Tumblr',function($scope, login, Tumblr) {
  $scope.posts = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  Tumblr.findPost()
  .then(function(res) {
    console.log(res);
    $scope.posts = res.response.posts;
    console.log($scope.posts);
    $scope.name = res.response.blog.name;
  });


}])

.controller('BlogPostCtrl', ['$scope', '$stateParams', 'Post', function($scope, $stateParams, Post) {
  $scope.Id = $stateParams.postId;
  Post.findPost($stateParams.postId)
  .then(function(res) {
    console.log(res);
    $scope.post = res[0];
    console.log($scope.post);
  });
}]);
