app.factory('UserFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/user/';

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
      url : url,
      method : 'GET',
      params : id ? { id : id } : {}
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateUser = (id, payload) => {
    const obj = {
      url : url,
      method : 'PUT',
      params : { id : id },
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteUser = (id) => {
    const obj = {
      url : url,
      method : 'DELETE',
      params : { id : id }
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});

