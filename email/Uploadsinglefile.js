const router = require("../routes/sinhvien");
const upload = require("../email/Upload");


router.post('/upload',[upload.single('image')],
   async (req, res, next) =>{
    try{
        const{file}= req;
        if(!file){
            return res.json({status:0,link:""});
        }else{
            const url = `http://192.168.1.13.3000/images/${file.filename}`;
            return res.json({status:1,url:url});
        }
    }catch(error){
        console.log('Upload image erroe:', error);
        return res.json({status: 0, link : ""});
    }
   });
 module.exports = router;
  
