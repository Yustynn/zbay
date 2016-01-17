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
      method : 'GET',
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
