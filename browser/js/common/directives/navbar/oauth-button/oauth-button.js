'use strict';

app.directive('oauthButton', () => {
  return {
    scope: {
      serviceProvider: '@'
    },
    restrict: 'E',
    templateUrl: '/browser/components/oauth-button/oauth-button.html'
  }
});
