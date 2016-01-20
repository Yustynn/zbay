app.directive('zbayCarousel', () => {
  return {
    restrict : 'E',
    templateUrl : 'js/common/directives/zBayCarousel/zBayCarousel.html',
    scope : {
      products : '=',
      height : '@'
    }
  }
});
