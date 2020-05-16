const multer= require('multer');

module.exports= multer({
    storage:multer.diskStorage({}),
        // destination:(req,file,cb)=>{
        //     cb(null, './uploads');
        // },
        // filename:(req,res,cb)=> {
        //     cb(null, Date.now()+'.'+file.originalname);
        // }

        fileFilter:(req,file,cb)=>{
            cb(null,true);
        }

})
