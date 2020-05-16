//  MongoDB Models

const User = require('../../model/users')
const Contact = require('../../model/contact')
const RUCContact = require('../../model/ruc_contact')
const Event = require('../../model/event')
const CandidateSubscribed= require('../../model/subscribe');
const Donation = require('../../model/donation')

class FetchController {

  getUserLikedParticularBlog(values) {
    return new Promise((resolve, reject) => {

      User.find({ $and: [{ _id: values.userid }, { likedblog: values.blogid }] })
        .then(result => {
          console.log(result.length, '(((((')
          resolve(result.length);
        })
        .catch(err => {
          reject(err);
        });

    })
  }

  user() {
    return new Promise((resolve, reject) => {
      User.find({})
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });

    })
  }

  contact() {
    return new Promise((resolve, reject) => {

      Contact.find({})
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });

    })
  }

  rucContact() {
    return new Promise((resolve, reject) => {

      RUCContact.find({})
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });

    })
  }

  allEvent() {
    return new Promise((resolve, reject)=> {
      Event.find({})
      .then(result=> {
        return resolve(result);
      })
      .catch(err=> {
        return reject(err);
      })
    })
  }

  pastEvent() {
    console.log('hit')
    return new Promise ((resolve, reject)=> {
      var recentDate = new Date();
      Event.find({date_of_event: { $lt: recentDate } })
      .then(result=> {
        return resolve(result);
      })
      .catch(err=> {
        return reject(err);
      })
    })
  }

  upcomingEvent() {
    return new Promise ((resolve, reject)=> {
      var recentDate = new Date();
      Event.find({date_of_event: { $gt: recentDate } })
      .then(result=> {
        return resolve(result);
      })
      .catch(err=> {
        return reject(err);
      })
    })
  }

  getsuscribed(){
    return new Promise((resolve, reject)=>{
      CandidateSubscribed.find({})
          .then(result=>{
            resolve(result);
          })
          .catch(err=>{
            reject(err);
          })
    })
  }

  getdonation(){
    return new Promise((resolve, reject)=>{
      Donation.find({}).sort({'date_added': -1})
          .then(result=>{
            resolve(result);
          })
          .catch(err=>{
            reject(err);
          })
    })
  }

}

module.exports = new FetchController();
