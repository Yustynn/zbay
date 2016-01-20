/**
 * Created by Jon on 1/15/16.
 */
app.config($stateProvider => {

    $stateProvider.state('search', {
        url: '/search',
        templateUrl: 'js/search/search.html',
        controller: 'SearchCtrl'
    });
});

app.controller('SearchCtrl', () => {

});
