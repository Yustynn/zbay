/**
 * Provides helper functions that are useful to all factories
 */
app.factory('HelperFactory', ($http) => {
  const factory = {};

  factory.httpResponse = (obj) =>
    $http(obj).then(response => response.data);

  return factory;
});
