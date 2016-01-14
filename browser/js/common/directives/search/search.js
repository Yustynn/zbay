/**
 *  Search bar
 *  Might want to include the Product factory
 *  so that the search has dynamic capability
 */
app.directive('search', () => {
  return {
    restrict : 'E',
    replace : true,
    templateUrl : 'js/common/directives/search/search.html',
    link : (scope) => {

    }
  }
});
