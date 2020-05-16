// const express= require('express');
// const routes= express.Router();
// const paypal = require('paypal-rest-sdk');
// // const payments = paypal.v1.payments;
// const app_id='AZXdzxfW1FQC8ntB29YV2q33s5lbekfwSIACIL9fE3XMXP8R4s4EGvLaV02n4Xrk65OcthkhfQ-uxBhA'
// const secret='EGQXEIX7v1fdKDHLyYB7EqW8kk6CJBevkB6hMct7BoMew52sifqdfjdD-CtxTT7erNUF6dKX2fmwXwvn'
// let env = new paypal.core.SandboxEnvironment(app_id, secret);

// let client = new paypal.core.PayPalHttpClient(env);

// routes.get('/paypal',(req,res)=>{
// 	var create_payment_json = {
//                     'intent': 'sale',
//                     'payer': {
//                         'payment_method': 'paypal'
//                     },
//                     'redirect_urls': {
//                         'return_url': 
//                           'http://localhost:3000/paymentSuccess',
//                           'cancel_url': 'http://cancel.url'
//                     },
//                     'transactions': [{
//                         'item_list': {
//                             'items': [
//                                 {
//                                     'name': 'item',
//                                     'sku': 'item',
//                                     'price': '1.00',
//                                     'currency': 'USD',
//                                     'quantity': 1
//                                 }

//                             ]
//                         },
//                         'amount': {
//                             'currency': 'USD',
//                             'total': '1.00'
//                         },
//                         'description': 'This is the payment'
//                     }]
//                 };

//                 let request = new payments.PaymentCreateRequest();
//                 requestt.requestBody(create_payment_json);


//                 let mrrrr;
//                 client.execute(requestt).then((response) => {
//                     console.log(response.statusCode);
//                     console.log(response.result);

//                     _.map(response.result.links, (value) => {
//                         if (value.rel === 'approval_url') {
//                             // reply.redirect(response.result.links[i].href);
//                             mrrrr = value.href;
//                             console.log('mrrrr', mrrrr);
//                             // return reply.redirect(mrrrr);
//                         }
//                     });
//                 }).catch((error) => {
//                     console.error(error.statusCode);
//                     console.error(error.message);
//                 });
// })

// routes.get('/paymentSuccess', (req, res)=>{
// 	console.log('this is  query parameters', req.query);

// console.log('this is  query parameters', req);
//                 const payerID = req.query.PayerID;
//                 const paymentID = req.query.paymentId;

//                 const execute_payment_json = {
//                     'payer_id': payerID
//                 };

//                 let ww = new payments.PaymentExecuteRequest(paymentID);
//                 ww.requestBody(execute_payment_json);

//                 client.execute(ww).then((response) => {
//                     console.log('success', response.statusCode);
//                     console.log('success', response.result);

//                 }).catch((error) => {
//                     console.error(error.statusCode);
//                     console.error(error.message);
//                 });
// })
// module.exports= routes;