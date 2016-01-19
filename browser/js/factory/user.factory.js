app.factory('UserFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/users/';

  factory.createUser = (payload) => {
    const obj = {
      url : url,
      method : 'POST',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getUser = (id) => {
    const obj = {
      url : url + (id ? id : ''),
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj)
  };

    factory.getReviewsForUser = (userId) => {
    const obj = {
      url : url + userId + '/reviews',
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

    factory.getProductsForUser = (userId) => {
    const obj = {
      url : url + userId + '/products',
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

    factory.getOrdersForUser = (userId) => {
    const obj = {
      url : url + userId + '/orders',
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateUser = (id, payload) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteUser = (id) => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
