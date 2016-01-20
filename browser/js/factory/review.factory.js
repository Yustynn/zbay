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

//****CHECK THIS OUT AND MAKE SURE IT'S OKAY!!!!!!******//
  factory.getReview = (id) => {
    const obj = {
      url : url+id,
      method : 'GET',
      data: {_id: id}
    };
    return HelperFactory.httpResponse(obj);
  };
//***END SCARY CHECKING AREA!!!//

  factory.updateReview = (id, payload) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteReview = (id) => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  }


  return factory;
});
