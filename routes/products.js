var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send('respond with a resource');
  });
  
  const productModel = require('../models/productModel');
  var upload = require('../util/uploadConfig');

  router.post('/upload', [upload.single('image')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });

  
  
//   - Lấy danh sách tất cả các sản phẩm
    router.get("/all", async function(req, res) {
      try {
        var list = await productModel.find().populate("user");
        res.status(200).json({status: true, message:"Thành công", data: list})
      } catch (error) {
        res.status(400).json({status: false, message:"Có lỗi xảy ra"})
      }
    });

// - Lấy danh sách tất cả các sản phẩm có số lượng lớn hơn 20
    //localhost:3000/products/sl?soluong=20
  router.get("/sl", async function (req, res) {
    try{
    const {soluong} = req.query;
    var list = await productModel.find({soluong : {$gt: soluong}});
      res.status(200).json({status: true, message:"Thành công", data: list})
    } catch (error) {
      res.status(400).json({status: false, message:"Có lỗi xảy ra"})
    }
  });


// - Lấy danh sách sản phẩm có giá từ 20000 đến 50000
//localhost:3000/products/gia?min=20&max=20
    router.get("/gia", async function (req, res) {
      try{
      const {min, max} = req.query;
      var list = await productModel.find({gia: {$gte:min, $lte: max}});
        res.status(200).json({status: true, message:"Thành công", data: list})
      } catch (error) {
        res.status(400).json({status: false, message:"Có lỗi xảy ra" })
      }
    });

// - Lấy danh sách sản phẩm có số lượng nhỏ hơn 10 hoặc giá lớn hơn 15000
//localhost:3000/products/nho?nhohon=20&lonhon=20
router.get("/nho", async function (req, res) {
  try{
  const {nhohon, lonhon} = req.query;
  var list = await productModel.find({$or: [{soluong: {$lt: nhohon}},{gia: {$gt: lonhon}}]});
    res.status(200).json({status: true, message:"Thành công", data: list})
  } catch (error) {
    res.status(400).json({status: false, message:"Có lỗi xảy ra" })
  }
});


    // - Lấy thông tin chi tiết của sản phẩm
    router.get("/detail/:id", async function (req, res) {
      try{
      const {id} = req.params;
      var list = await productModel.findById(id);
        res.status(200).json({status: true, message:"Thành công", data: list})
      } catch (error) {
        res.status(400).json({status: false, message:"Có lỗi xảy ra" })
      }
    });



  // thêm
  router.post("/add", async function(req, res){
    try{
        const{masp, tensp, gia, soluong} = req.body;
        const newItem = {masp, tensp, gia, soluong};
        await productModel.create(newItem);
        res.status(200).json({status: true, message:"Thành công"});
      } catch (error) {
        res.status(400).json({status: false, message:"Có lỗi xảy ra" });
      }
  });

  // sửa
  router.put("/edit", async function(req, res){
    try{
        const {id, masp, tensp, gia, soluong} = req.body;

        var itemUpdate = await productModel.findById(id);

        if(itemUpdate){
            itemUpdate.masp = masp ? masp : itemUpdate.masp;
            itemUpdate.name = tensp ? tensp : itemUpdate.name;
            itemUpdate.gia = gia ? gia : itemUpdate.gia;
            itemUpdate.soluong = soluong ? soluong : itemUpdate.soluong;
            await itemUpdate.save();
            res.status(200).json({status: true, message:"Thành công"});
        }else{  
          res.status(400).json({status: false, message:"Không tìm thấy"});
        }
      } catch (error) {
        res.status(400).json({status: false, message:"Có lỗi xảy ra" });
      }
  });

  // xóa
  router.delete("/delete/:id", async function(req, res){
    try{
        const {id} = req.params;
        await productModel.findByIdAndDelete(id);
        res.status(200).json({status: true, message:"Thành công"});
      } catch (error) {
        res.status(400).json({status: false, message:"Có lỗi xảy ra" });
      }
  });



  
  
  module.exports = router;