require('babel-core');
const mongoose = require('mongoose');

require('../server/db');

const User = mongoose.model('User');

User.findOneAndUpdate({email: 'yustynn@gmail.com'}, {isAdmin: true}, {new: true})
.then(adminifiedUser => { console.log(adminifiedUser) });
