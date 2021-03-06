app.directive('zbayNavbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/zBayNavbar/zBayNavbar.html',
    link: function (scope) {

      scope.items = [
        { label: 'Zbay', state: 'home' },
        { label: 'About', state: 'about' },
        { label : 'Products', state : 'products.all' },
        { label : 'Marketplace', state : 'marketplace' },
        { label: 'Admin', state: 'admin', admin: true },
        { label: 'Profile', state: 'userProfile', auth: true }
      ];

      scope.user = null;

      scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
      };

      scope.logout = function () {
        AuthService.logout().then(function () {
          $state.go('home');
        });
      };

      var setUser = function () {
        AuthService.getLoggedInUser().then(function (user) {
          scope.user = user;
        });
      };

      var removeUser = function () {
        scope.user = null;
      };

      setUser();

      $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
      $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

    }

  };

});
