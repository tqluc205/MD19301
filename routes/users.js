var express = require('express');
var router = express.Router();

//http://localhost:3000/all
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// login
router.post("/login", async function (req, res) {
  try{
    const {username, password}= req.body;
    const checkUser = await userModel.findOne({username: username,password:pass});
    if(checkUser == null){
      res.status(400).json({status: false})

    }
  }catch(e){
    res.status(400).json({status: false, message:"Đã có lõi xảy ra"});
  }
  
});

module.exports = router;