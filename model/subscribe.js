const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
const validator=require('mongoose-unique-validator');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const candidate = mongoose.Schema({
  firstname:{type: String,required:true},
  lastname:{type: String,required:true},
  email:{type:String, require:true, unique:true}
  // candidate_no:{type:Number}
}).plugin(validator);
module.exports = mongoose.model('CandidateSubscribed', candidate, 'CandidateSubscribed');
