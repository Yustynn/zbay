app.directive('fullProduct', () => {
  return {
    scope: {
      product: '@'
    },
    templateUrl: 'js/common/directives/full-product/full-product.html'
  }
});
