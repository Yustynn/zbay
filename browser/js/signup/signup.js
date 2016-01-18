app.config($stateProvider => {

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  });

});

app.controller('SignupCtrl', ($scope, AuthService, $state, UserFactory) => {

  $scope.login = {};
  $scope.error = null;

  $scope.sendSignup = function(signupInfo) {
    $scope.error = null;

    UserFactory.createUser(signupInfo)
      .catch((e) => {
        $scope.error = 'There\'s a problem with your thing. Fix your thing.';
        console.dir(e);
      })
      .then(() => AuthService.login({
        email: signupInfo.email,
        password: signupInfo.password
      }))
      .then(() => {
        $state.go('home')
      })
      .catch(() => {
        $scope.error = 'User already exists for that email address!'
      })
  };

});
