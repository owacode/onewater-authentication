const mongoose= require('mongoose');

const donation = mongoose.Schema({
  name:{type:String},
  email:{type:String},
  amount:{type: Number},
  date_added:{type: Date},
});

module.exports = mongoose.model('Donation', donation, 'Donation');
