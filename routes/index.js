var express = require('express');
var router = express.Router();

/* GET home page. */
//http://localhost:3000/users/all
router.get('/all', function(req, res, next) {
  res.render('index', { title: 'Express 02' });
});

module.exports = router;

//MaSp TenSP Gia
//Sp01 Chocopice 15000
//SP02 Custas 20000
//string,number,boolean,null,object,array
[
  {
  "masp" : "SP01",
  "tensp" : "chocopice",
  "gia":15000,
  "rating": "4.7",
  "exp":"04/07/2025",
  "status": true,
  "desc": null,
  "catagory": {
    "id":1,
    "name":"Bánh",
    "image":"hinh.png"
  }
},

{
  "masp" : "SP02",
  "tensp" : "Custas",
  "gia":2000
}
]


