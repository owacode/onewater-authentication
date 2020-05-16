//  MongoDB Models
const User = require('../../model/users');
const Admin = require('../../model/admin');
const AllAuthor = require('../../model/all_author');
const Donation = require('../../model/donation')
const Contact = require('../../model/contact')
const RUCContact = require('../../model/ruc_contact')
const Event = require('../../model/event')
const CandidateSubscribed = require('../../model/subscribe');
// Controllers
const updateController = require('./update');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeoutlook = require('nodejs-nodemailer-outlook');

const nodemailerAuthCredential = {
  user: "OWACODE@onewateracademy.org",
  pass: "Panda@21"
}

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

let token;
class AdderOperationController {

  addPaymentInfo(values) {
    return new Promise((resolve, reject) => {
      const donation = new Donation({
        name: values.name,
        email: values.email,
        amount: values.amount,
        date_added: getTime()
      });

      donation.save()
        .then(result => {
          paymentSuccessMail(values.email);
          resolve(result);
        })
        .catch(err => reject(err));
    });
  }

  addNewUser(values) {
    console.log(values);
    token = jwt.sign({ email: values.email }, '@@@#%&$ve%*(tok???//---==+++!!!e!!n)@rify@@@@');
    return new Promise((resolve, reject) => {
      saltHashPassword(values.password)
        .then(result => {
          const user = new User({
            name: values.name,
            email: values.email,
            date_added: getTime(),
            verified: false,
            token: token,
            salt: result.salt,
            password: result.passwordHash,
            likedblog: []
          });
          return user.save();
        })
        .then(result => {
          verifyUser(values.email);
          resolve(result);
        })
        .catch(err => {
          console.log("Error in adding User", err);
          reject(err);
        })

    })
  }

  // Login Function
  login(userdata) {
    return new Promise((resolve, reject) => {
      console.log(userdata);
      User.find({ email: userdata.email })
        .then(result => {
          console.log('%%%%%%%', result)
          if (result.length == 0) {
            return AllAuthor.find({ email: userdata.email })
            .then(result=> {
              if (result.length == 0) return reject('No User Found');
              else return reject('Author Account');
            })

          }
          const passdata = sha512(userdata.password, result[0].salt);
          if (result[0].password !== passdata.passwordHash) {
            return reject("Incorrect Password");
          }
          if (result[0].verified == false) return reject("User Email not Verified");
          const token = jwt.sign({ email: result[0].email, userid: result[0]._id }, '%%%$$#book!*!(se!!ing^^&min%$#*)((//or'
          )
          console.log(result[0]._id, result[0].unapproved_id)
          resolve({ token: token, user: result[0] });
        })
    })
  }

  // Admin Sign Up
  addAdmin(values) {
    console.log(values);
    return new Promise((resolve, reject) => {
      saltHashPassword(values.password)
        .then(result => {
          const admin = new Admin({
            email: values.email,
            salt: result.salt,
            password: result.passwordHash,
            date_added: getTime()
          });
          return admin.save();
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          console.log("Error in adding User", err);
          reject(err);
        })

    })
  }

    //Admin Login Function
    adminLogin(userdata) {
      return new Promise((resolve, reject) => {
        console.log(userdata);
        Admin.find({ email: userdata.email })
          .then(result => {
            console.log(result)
            if (result.length == 0) {
              return reject("No User Found");
            }
            const passdata = sha512(userdata.password, result[0].salt);
            if (result[0].password !== passdata.passwordHash) {
              return reject("Incorrect Password");
            }
            const token = jwt.sign({ email: result[0].email, userid: result[0]._id }, '%%%$$#book!*!(se!!ing^^&min%$#*)((//or');
            resolve({ token: token, user: result[0] });
          })
      })
    }

  verifyMail(values) {
    return new Promise((resolve, reject) => {
      User.find({ token: values.token })
        .then(result => {
          if (!result) {
            return reject("Invalid Token");
          }
          const verification_result = jwt.verify(values.token, '@@@#%&$ve%*(tok???//---==+++!!!e!!n)@rify@@@@');
          const user = verification_result.email;
          console.log(user);
          User.findOneAndUpdate({ email: user }, { $set: { verified: true } })
            .then(result => {
              console.log(result, 'User Verified');
              return resolve(result);
            })

        })
    })
  }

  contact(values) {
    return new Promise((resolve, reject) => {
      const contact = new Contact({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        date_added: getTime()
      })
      contact.save()
        .then(result => {
          thanksMailAfterUserContact(values.email);
          adminMailAfterUserContact(values);
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        })
    })
  }

  rucContact(values) {
    return new Promise((resolve, reject) => {
      const contact = new RUCContact({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        date_added: getTime()
      })
      contact.save()
        .then(result => {
          thanksMailAfterUserContact(values.email);
          adminMailAfterUserContact(values);
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        })
    })
  }

  event(values) {
    console.log(values);
    return new Promise((resolve, reject) => {
      const event = new Event({
        name: values.name,
        desc: values.desc,
        image: values.imageURL,
        link: values.link,
        date_of_event: values.date_of_event,
        date_added: getTime()
      })

      event.save()
        .then(result => { return resolve(result) })
        .catch(err => { return reject(err) });
    })
  }

  subscribe(values) {
    return new Promise((resolve, reject) => {
      const candidate = new CandidateSubscribed({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email
      })
      candidate.save()
        .then(result => {
          console.log('$$$$$$$$$', values.email);
          newsletterSubscriptionMail(values.email);
          resolve(result)
        })
        .catch(err => {
          reject(err);
        })
    })
  }


}

module.exports = new AdderOperationController();

// This Function is for Getting IST
function getTime() {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330;   // IST offset UTC +5:30

  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

  // ISTTime now represents the time in IST coordinates
  return ISTTime;
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

function verifyUser(email) {
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: 'OneWater <OWACODE@onewateracademy.org>',
    to: email,
    subject: "Verify Account✔", // Subject line
    text: "Verify your Email for OneWater",
    html: `
      <h4>Hello!</h4>
      <p>Thank you for signing up and joining the OneWater Academy. Please click on the link to verify your account.<br>
      <a href="https://onewater-auth.herokuapp.com/activate/` + token + `">https://onewater-auth.herokuapp.com/activate/` + token + `</a><br>

      OneWater Academy
      </p>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
  // const msg = {
  //   from: 'OneWater <owa@onewaterxchange.org>',
  //   to: email,
  //   subject: "Verify Account✔", // Subject line
  //   text: "Verify your Email for OneWater",
  //   html: `
  //     <h4>Hello!</h4>
  //     <p>Thank you for signing up and joining the OneWater Academy. Please click on the link to verify your account <a href="https://onewater-auth.herokuapp.com/activate/` + token + `">https://onewater-auth.herokuapp.com/activate/` + token + `
  //     </a></p>
  //     `, // html body
  // };
  // sgMail.send(msg)
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
}

function paymentSuccessMail(email) {
  console.log('$$$$$$$$$', email, token);
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: 'OneWater Academy <OWACODE@onewateracademy.org>',
    to: email,
    subject: "Payment Successfull", // Subject line
    text: "Verify your Email for OneWater",
    html: `
      <p>The team at OneWater Academy thanks you for supporting the OneWater Drop Campaign.
      Your support allows us to provide scholarships and subsidies in the subscription to OneWater Xchange.
      Please also note that OneWater Academy is a registered 501.(c) (3) organization and therefore your charitable contributions to
      the Academy may be eligible for tax deductions.
      Sincerely,
      The Team at OneWater Academy
      </p>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
  // const msg = {
  //   from: 'OneWater <owa@onewaterxchange.org>',
  //   to: email,
  //   subject: "Payment Successfull✔", // Subject line
  //   text: "Verify your Email for OneWater",
  //   html: `
  //     <h4>Thanks for Donating to OneWater Academy</h4>
  //     `, // html body
  // };
  // sgMail.send(msg)
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
}

function thanksMailAfterUserContact(email) {
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: 'OneWater <OWACODE@onewateracademy.org>',
    to: email,
    subject: "Thanks for contacting us", // Subject line
    text: "Verify your Email for OneWater",
    html: `
      <p>Thanks for contacting to Onewater We will look to your problem and respond you soon.</p>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
});
  // const msg = {
  //   from: 'OneWater <owa@onewaterxchange.org>',
  //   to: email,
  //   subject: "Thanks for contacting us", // Subject line
  //   text: "Verify your Email for OneWater",
  //   html: `
  //     <h4>Thanks for contacting to Onewater We will look to your problem and respond you soon.</h4>
  //     `, // html body
  // };
  // sgMail.send(msg)
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
}

function adminMailAfterUserContact(user) {
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: 'OneWater <OWACODE@onewateracademy.org>',
    to: 'OWACODE@onewateracademy.org',
    subject: `User Problem, ${user.subject}`, // Subject line
    text: "User Problem",
    html: `
      <h2>${user.name} has some problem and tried to contact you </h2>
      <h4> Email: <br> ${user.email} </h4>
      <h5> Subject: <br> ${user.subject} </h5>
      <p> Message: <br> ${user.message} </p>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
});
  // const msg = {
  //   from: 'OneWater <owa@onewaterxchange.org>',
  //   to: 'OWACODE@onewateracademy.org',
  //   subject: `User Problem, ${user.subject}`, // Subject line
  //   text: "User Problem",
  //   html: `
  //     <h2>${user.name} has some problem and tried to contact you </h2>
  //     <h4> Email: <br> ${user.email} </h4>
  //     <h5> Subject: <br> ${user.subject} </h5>
  //     <p> Message: <br> ${user.message} </p>
  //     `, // html body
  // };
  // sgMail.send(msg)
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
}

function newsletterSubscriptionMail(email) {
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: 'OneWater <OWACODE@onewateracademy.org>',
    to: email,
    subject: `Subscribed Successfully`, // Subject line
    html: `
      <p> Thank you for subscribing! </p>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
});
}
