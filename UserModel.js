const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 email: String,
 password: String,
});

const User = mongoose.model('User', UserSchema);

exports.saveUser = function(inMail, inPassword){
  var user = User({
    email:inMail,
    password: inPassword,
  });
  user.save();
};
exports.getUser = async function(uEmail){
  return await User.findOne ({email: uEmail});

};
