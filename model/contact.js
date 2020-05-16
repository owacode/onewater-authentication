const mongoose= require('mongoose');

const contact = mongoose.Schema({
  name:{type:String},
  email:{type:String},
  subject:{type: String},
  message:{type: String},
  date_added:{type: Date}
});

module.exports = mongoose.model('Contact', contact, 'Contact');
