//  MongoDB Models

const User= require('../../model/users');
const nodeoutlook = require('nodejs-nodemailer-outlook');
const jwt = require('jsonwebtoken');
const updateController = require('./update');
const crypto = require('crypto');

const nodemailerAuthCredential = {
  user: "OWACODE@onewateracademy.org",
  pass: "Panda@21"
}

let token;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
class UpdateController{

  addLikedBLogToUser(values){
    // console.log(values,'iii')
    return new Promise((resolve, reject)=>{

      User.findByIdAndUpdate({_id:values.userid},{$addToSet:{likedblog:values.blogid}})
      .then(result =>{
        console.log(result)
        resolve(result);
      })
      .catch(err =>{
        reject(err);
      });

    })
  }

  recoverPassword(email) {
    return new Promise((resolve, reject) => {
      console.log('got email', email)
      token = jwt.sign({ email: email, platform: 'onewateruser' }, '@@#%&$ve%*(tok???//-!!==+++!!!e!!n)@reset@@@@pass');
      console.log(token);
      User.find({ email: email })
        .then(result => {
          console.log(result,'$#$')
          if (result.length == 0) {
            reject("Email Not Exist");
          } else {
            resetPasswordUserConfirmation(email);
            return resolve("Reset Mail Send Successfully");
          }
        })
    })
  }

  updatePassword(values) {
    return new Promise((resolve, reject) => {
      console.log(values);
      saltHashPassword(values.password)
        .then(result => {
          console.log('hash !!!', result);
          return User.findOneAndUpdate({ email: values.email }, { $set: { password: result.passwordHash, salt: result.salt } });
        })
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        })
    })
  }

}

//  ################################# Crypto Salt Hash Functions Start ###############################
var genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length);   /** return required number of characters */
};

var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  };
};

function saltHashPassword(userpassword) {
  console.log('salthash hit')
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  console.log('UserPassword = ' + userpassword);
  console.log('Passwordhash = ' + passwordData.passwordHash);
  console.log('nSalt = ' + passwordData.salt);

  return new Promise((resolve, reject) => {
    resolve(passwordData);
  })
}
//  ################################# Crypto Salt Hash Function Ends ###############################

function resetPasswordUserConfirmation(email) {
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: 'OneWater <OWACODE@onewateracademy.org>',
    to: email,
    subject: "Reset Password✔", // Subject line
    text: "Reset Password",
    html: `
      <h4>Reset Password <h4>
      <p>Click on the link to Reset Your Password <a href="http://www.onewateracademy.org/onewater/recover-password/` + token + `">http://www.onewateracademy.org/onewater/recover-password/` + token + `
      </a>`, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
    // const msg = {
    //   from: 'OneWater <owa@onewaterxchange.org>',
    //   to: email,
    //   subject: "Reset Password✔", // Subject line
    //   text: "Reset Password",
    //   html: `
    //     <h4>Reset Password <h4>
    //     <p>Click on the link to Reset Your Password <a href="http://www.onewateracademy.org/onewater/recover-password/` + token + `">http://www.onewateracademy.org/onewater/recover-password/` + token + `
    //     </a>`, // html body
    // };
    // sgMail.send(msg)
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
}

module.exports= new UpdateController();
