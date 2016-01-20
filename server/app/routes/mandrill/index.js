//http://matthewgladney.com/blog/angular/using-mandrill-with-the-node-api-and-an-angular-client/
'use strict';
const router = require('express').Router();
module.exports = router;
const mandrill = require('mandrill-api/mandrill');
const mandrill_client = new mandrill.Mandrill('LyKLU69LFLNaqJbFPA_6Ig');

router.post('/', function(req, res, next) {
  console.log("in mandrill route");
  console.log(req.body.user);
  console.log(req.body.cart);


  const toEmail = "victor.hom16@gmail.com"; //should be user email
  const fromEmail = "victor.hom16@gmail.com";

  let emailOfProduct = req.body.cart.map(function(product) {
    return "<li>"+product.title+"</li>";
  });
  emailOfProduct = "<ul>" +emailOfProduct.join("") +"</ul>";

  const html = `<p>Thank you for your purchase with zBay, ${req.body.user.name}.
    We appreciate your service. You made an order for the following.</p>
    ${emailOfProduct}`;

  var message = {
    "html" : html,
    "text" : req.body.cart,
    "subject": "Your purchase with zBay",
    "from_email" : fromEmail,
    "from_name" : "zBay",
    "to" : [{
      "email" : toEmail,
      "name" : req.body.name,
      "type" : "to"
    }],
    "headers" : {
      "Reply-To" : "zBay@gmail.com"
    }
  };
  var async = false;
  mandrill_client.messages.send({
    "message" : message,
    "async" : async
  }, function(result) {
    res.json(result);
  }, function(e){
    //console.log("error");
  });

});
