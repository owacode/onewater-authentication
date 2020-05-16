const mongoose= require('mongoose');
const validator=require('mongoose-unique-validator');

const author = mongoose.Schema({
  name:{type:String},
  email:{type:String, unique:true},
  password:{type: String},
  salt:{type: String},
  date_added:{type: Date},
  token:{type: String},
  isPaid:{type: String},
  PayerName:{type: String},
  PayerEmail:{type: String},
  date_of_payment:{type: Date},
  verified:{type: Boolean},
  likedblog:[]
}).plugin(validator);

module.exports = mongoose.model('User', author, 'Users');
