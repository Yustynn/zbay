'use strict';

app.directive('oauthButton', () => {
  return {
    scope: {
      serviceProvider: '@'
    },
    restrict: 'E',
    templateUrl: 'js/common/directives/navbar/oauth-button/oauth-button.html'
  }
});
