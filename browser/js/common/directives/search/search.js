/**
 *  Search bar
 *  Might want to include the Product factory
 *  so that the search has dynamic capability
 *  main functionality of a search bar, is to send user to a product route or
 *  if search term does not exist, it sends the user to a product not found page
 */
app.directive('searchbar', (ProductFactory) => {
  return {
    restrict : 'E',
    templateUrl : 'js/common/directives/search/search.html',
    link : (scope) => {
      scope.submit = () => {
        scope.search = "";
      }
    }
  }
});
