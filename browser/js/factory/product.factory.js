app.factory('ProductFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/products/';

  factory.createProduct = (payload) => {
    const obj = {
      url : url,
      method : 'POST',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getProduct = (id) => {
    const obj = {
      url : url + (id ? id : ''),
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateProduct = (id, payload) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteProduct = (id) => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getProductReviews = (id) => {
    const obj = {
      url: url + id + '/reviews',
      method: 'GET',
    }
    return HelperFactory.httpResponse(obj);
  }

  return factory;
});
