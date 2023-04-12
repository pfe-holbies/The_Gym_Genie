const mongoose = require('mongoose');
//const { encryptPassword } = require('../utils/bcrypt');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  updatedat: {
    type: Date,
    default: Date.now,
  },
});

// Time and Date stamp
UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// hash user password
/* UserSchema.pre('save', async function (next) {
    if (this.isNew ||!this.isModified('password')) {
        return next();
    }

    this.password = await encryptPassword(this.password);
    next();
}); */

module.exports = mongoose.model('User', UserSchema);