app.factory('ReviewFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/review/'

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
      url : url,
      method : 'GET',
      params : id ? { id : id } : {}
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateReview = (id, payload) => {
    const obj = {
      url : url,
      method : 'PUT',
      params : { id : id },
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteReview = () => {
    const obj = {
      url : url,
      method : 'DELETE',
      params : { id : id }
    };
    return HelperFactory.httpResponse(obj);
  }
  return factory;
});
