// const NotApprovedBlog= require('../../model/unapproved_blog');
// const NotApprovedAuthor= require('../../model/unapproved_author');
// const ApprovedAuthor= require('../../model/approved_author');
// const ApprovedBlog= require('../../model/approved_blog');
// const updateController= require('./update');

// class DeleteOperationController{
//   // This methord is for deleting the unpproved blog
//   // when we approved that blog
//   deleteUnapprovedBlog(id){
//     return new Promise((resolve, reject)=> {
//     NotApprovedBlog.findByIdAndDelete({_id:id})
//     .then(result =>{
//       console.log("Blog deleted from UnApproved",result);
//       resolve(result);
//     })
//     .catch(err =>{
//       console.log("Error in Deleting Blog", err);
//       reject(err);
//     })
//     });
// }

//   // This methord is for deleting the pproved blog by author
//   deleteApprovedBlog(values){
//     return new Promise((resolve, reject)=> {

//     updateController.deleteApproveBlog(values);
    
//     ApprovedBlog.findByIdAndDelete({_id:values.id})
//     .then(result =>{
//       console.log("Blog deleted from Approved",result);
//       resolve(result);
//     })
//     .catch(err =>{
//       console.log("Error in Deleting Blog", err);
//       reject(err);
//     })
//     });
// }

//   // This methord is for deleting the unpproved author
//   // when we approved that author profile
//   deleteUnapprovedAuthor(id){
//     return new Promise((resolve, reject)=> {
//       console.log('hit delete')
//       NotApprovedAuthor.findByIdAndDelete({_id:id})
//       .then(result =>{
//         console.log("Author Profile deleted from UnApproved", result);
//         resolve(result);
//       })
//       .catch(err =>{
//         console.log("Error in Deleting Author Profile", err);
//         reject(err);
//       })
//     })
//   }
// }

// module.exports= new DeleteOperationController();
