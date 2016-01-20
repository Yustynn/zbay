app.factory('MandrillFactory', HelperFactory => {
  const factory = {};
  const url = '/api/mandrill/';

  factory.sendEmailConfirmation = (data) => {
    const obj = {
      url : url,
      method : 'POST',
      data : data
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
