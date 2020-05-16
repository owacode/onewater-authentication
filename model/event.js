const mongoose= require('mongoose');

const event = mongoose.Schema({
  name:{type:String},
  desc:{type:String},
  link:{type: String},
  image:{type: String},
  date_of_event:{type: Date},
  date_added:{type: Date}
});

module.exports = mongoose.model('Event', event, 'Events');
