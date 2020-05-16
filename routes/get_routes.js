const express= require('express');
const routes= express.Router();

// Controllers
const adderController= require('./controller/adder');
const deleteController= require('./controller/delete');
const updateController= require('./controller/update');
const fetchController= require('./controller/fetch');


routes.get('/likeblog',(req, res)=>{
  // console.log('hit 4000')
  const data={
    userid:req.query.userid,
    blogid:req.query.blogid
  }
  // console.log(data,'4000')
  updateController.addLikedBLogToUser(data)
  .then(result=> {
    res.json({
      status:'success',
      msg:'Liked BLog Added to User Profile'
    })
  })

  .catch(err=>{
    res.json({
      status:'error',
      msg:'Error in Adding Liked Blog to User Profile'
    })
  })
})

routes.get('/likedbyuser',(req, res)=>{
  const data={
    userid:req.query.userid,
    blogid:req.query.blogid
  }
  console.log(data,'%%%')
  fetchController.getUserLikedParticularBlog(data)
  .then(result=>{
    res.json({
      status:'success',
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

routes.get('/users',(req, res)=>{
  fetchController.user()
  .then(result=>{
    res.status(200).json({
      status:'success',
      result:result
    })
  })
  .catch(err=>{
    res.status(400).json({
      status:'error',
      error:err
    })
  })
})

// This is to fecth the user contact queries
routes.get('/contact',(req, res)=>{
  fetchController.contact()
  .then(result=>{
    res.status(200).json({
      status:'success',
      result:result
    })
  })
  .catch(err=>{
    res.status(400).json({
      status:'error',
      error:err
    })
  })
})

// This is to fecth the RUC user contact queries
routes.get('/ruc-contact',(req, res)=>{
  fetchController.rucContact()
  .then(result=>{
    res.status(200).json({
      status:'success',
      result:result
    })
  })
  .catch(err=>{
    res.status(400).json({
      status:'error',
      error:err
    })
  })
})

routes.get('/donation',(req, res)=>{
  fetchController.getdonation()
  .then(result=>{
    res.status(200).json({
      status:'success',
      result:result
    })
  })
  .catch(err=>{
    res.status(400).json({
      status:'error',
      error:err
    })
  })
})

// This is to Verify the Email
routes.get('/activate/:token', (req, res) => {
  adderController.verifyMail(req.params)
  .then(result =>{
      res.status(200).redirect('http://www.onewateracademy.org/onewater/thankyou-user');
  })
  .catch(err => {
    res.status(400).json({
      status:'error',
      error:err
    })
  })
})

routes.get('/all-event', (req,res)=> {
  fetchController.allEvent()
  .then(result=>{
    res.status(200).json({
      status:'success',
      msg: 'List of All Event',
      result:result
    })
  })
  .catch(err=>{
    res.status(400).json({
      status:'error',
      msg: 'Error in Fetching all event',
      error:err
    })
  })
})

routes.get('/past-event', (req,res)=> {
  fetchController.pastEvent()
  .then(result=>{
    res.status(200).json({
      status:'success',
      msg: 'List of Past Event',
      result:result
    })
  })
  .catch(err=>{
    res.status(400).json({
      status:'error',
      msg: 'Error in Fetching past event',
      error:err
    })
  })
})

routes.get('/upcoming-event', (req,res)=> {
  fetchController.upcomingEvent()
  .then(result=>{
    res.status(200).json({
      status:'success',
      msg: 'List of Upcomming Event',
      result:result
    })
  })
  .catch(err=>{
    res.status(400).json({
      status:'error',
      msg: 'Error in Fetching upcoming event',
      error:err
    })
  })
})

routes.get('/suscribed',(req, res)=> {
  fetchController.getsuscribed()
  .then(result=> {
      res.json({
          status:'success',
          msg:'Fetch Suscribed Candidates',
          result:result
      })
  })
  .catch(err=> {
      res.json({
        status:'error',
        error:err
      })
  })
})



module.exports= routes;
