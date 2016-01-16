app.factory('ReviewFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/reviews/'

  factory.createReview = (payload) => {
    const obj = {
      url : url,
      method : 'POST',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getReview = (id) => {
    const obj = {
      url : url + id,
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateReview = (id, payload) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteReview = () => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  }
  return factory;
});
