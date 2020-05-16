
const express = require('express');
const routes = express.Router();
const upload = require('./multer');
const cloudinary = require('cloudinary');
const cloudinarydetail = require('./cloudinary');
// Controllers
const adderController = require('./controller/adder');
const deleteController = require('./controller/delete');
const updateController = require('./controller/update');
const fetchController = require('./controller/fetch');

// Route for Donation Payment
routes.post('/pay', (req, res) => {
  console.log(req.body);
  adderController.addPaymentInfo(req.body)
    .then((result) => res.status(200).json({
      status: "success",
      msg: "Payment Successfull"
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for adding Videos by Author
routes.post('/newuser', (req, res) => {
  console.log(req.body);
  adderController.addNewUser(req.body)
    .then((result) =>
      res.status(200).json({
        status: "success",
        msg: "User Added Successfully"
      })
    )
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for adding New Admin
routes.post('/newadmin', (req, res) => {
  console.log(req.body);
  adderController.addAdmin(req.body)
    .then((result) =>
      res.status(200).json({
        status: "success",
        msg: "Admin Added Successfully"
      })
    )
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Login
routes.post('/admin-login', async (req, res) => {
  adderController.adminLogin(req.body)
    .then(result => {
      res.status(200).json({
        status: "success",
        msg: "Login Successfull",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      msg: err
    }));
})

// This is for user related queries (i.e when user tries to contact)
routes.post('/contact', (req, res) => {
  console.log(req.body);
  adderController.contact(req.body)
    .then(result =>
      res.status(200).json({
        status: 'success',
        msg: 'Your Query will be solved soon. Thanks for Contacting Us.',
        result: result
      })
    )
    .catch(err =>
      res.status(401).json({
        status: 'error',
        msg: 'Error in Contacting.',
        error: err
      })
    )
})

// This is for user related queries (i.e when RUC user tries to contact)
routes.post('/ruc-contact', (req, res) => {
  console.log(req.body);
  adderController.rucContact(req.body)
    .then(result =>
      res.status(200).json({
        status: 'success',
        msg: 'Your Query will be solved soon. Thanks for Contacting Us.',
        result: result
      })
    )
    .catch(err =>
      res.status(401).json({
        status: 'error',
        msg: 'Error in Contacting.',
        error: err
      })
    )
})

routes.post('/event', upload.single('image'), async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path)
    .catch((err) => {
      new Promise(() => { throw new Error('exception!'); });
      console.log(err);
    })
  req.body.imageURL = result.url;
  adderController.event(req.body)
    .then(result => {
      res.json({
        status: "success",
        msg: "Event added Successfully",
        result: result
      })
    })
    .catch(err => {
      res.json({
        status: "error",
        msg: "Error in adding Event",
        result: err
      })
    });
})

routes.post('/subscribe',(req, res)=>{
  console.log(req.body)
  adderController.subscribe(req.body)
  .then(result=>{
        res.json({
      status:'success',
      msg:'New Candidate Suscribed Successfully.',
      result:result
    })
  })
  .catch(err=>{
        res.json({
      status:'error',
      error:err
    })
  })
})

routes.post('/reset-password', (req, res) => {
  console.log(req.body);
  updateController.recoverPassword(req.body.email)
    .then(result => res.json({
      status: 'success',
      msg: 'Check you email',
      result: result
    }))
    .catch(err => res.json({
      status: 'error',
      msg: 'Email not Exist',
      error: err
    }))
})

routes.post('/update-password', (req, res) => {
  console.log(req.body);
  updateController.updatePassword(req.body)
    .then(result => res.json({
      status: 'success',
      msg: 'Password Update Successfully',
      result: result
    }))
    .catch(err => res.json({
      status: 'error',
      msg: 'Error in Updating Password',
      error: err
    }))
})
module.exports = routes;
