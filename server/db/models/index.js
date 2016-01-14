// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./user');
require('./review');
require('./sentEmailCollection');
require('./product');
require('./order');
require('./orderItem');
require('./category');
