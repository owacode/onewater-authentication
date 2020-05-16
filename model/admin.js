const mongoose= require('mongoose');
const validator=require('mongoose-unique-validator');

const admin = mongoose.Schema({
  email:{type:String, unique:true},
  password:{type: String},
  salt:{type: String},
  date_added:{type: Date},
}).plugin(validator);

module.exports = mongoose.model('Admin', admin, 'Admin');
