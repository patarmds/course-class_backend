const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  isEmailVerify: {
    type: Boolean,
    default : false
  },
  birthDate: {
    type: Date,
    required: true,
  },
  location: {     
   type: String,    
   required: true,
   },
  phoneNumber: {
    type: Number,
    required: true
  },
  isPhoneNumberVerify: {
    type: Boolean,
    default : false
  },
  profileImage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
},{
  collection : "users"
});
const User = mongoose.model("User", UserSchema);
module.exports = User;