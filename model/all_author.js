const mongoose= require('mongoose');
const validator=require('mongoose-unique-validator');

const author = mongoose.Schema({
  approved_id:{type:String},
  unapproved_id:{type:String},
  name:{type: String},
  bio:{type: String},
  image:{type: String},
  date_added:{type: Date},
  location:{type:String},
  rejected:{type:Boolean, defalut:false},
  status:{type:String, defalut:'pending'},
  linkedIn_id:{type: String},
  twitter_id:{type: String},
  email:{type: String, unique:true},
  password:{type: String},
  salt:{type: String},
  token:{type: String},
  interest_category:[],
  verified:{type:Boolean},
  form_filled:{type:Boolean},
}).plugin(validator);

module.exports = mongoose.model('AllAuthor', author, 'AllAuthors');
