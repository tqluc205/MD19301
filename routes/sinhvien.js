var express = require('express');
var router = express.Router();

var sinhvienModel = require("../models/sinhvienModel");
const { transporter } = require('../email/nodemailer');
const Upload = require('../email/Upload');

//1 - Lấy toàn bộ danh sách sinh viên
router.get("/all", async function(req, res){
    try {
        var list = await sinhvienModel.find();
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({status: false, message:"Có lỗi xảy ra"})
    }
});
//2 - Lấy toàn bộ danh sách sinh viên thuộc khoa cntt
// localhost:3000/sinhVien/get-khoacntt?boMon=cntt
router.get("/get-khoacntt", async function (req, res) {
    try {
        const {boMon} = req.query;
        const sinhVien = await sinhvienModel.find({ boMon: boMon });
        res.status(200).json(sinhVien);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});
//3 - Lấy danh sách sản phẩm có điểm trung bình từ 6.5 đến 9
// localhost:3000/sinhVien/get-diemTB?min=6.5&max=9
router.get("/get-diemTB", async function (req, res) {
    try {
        const { min, max } = req.query;
        const sinhVien = await sinhvienModel.find({ diemTB: { $gte: min, $lte: max } });
        res.status(200).json(sinhVien);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }

})
//4 - Tìm kiếm thông tin của sinh viên theo mssv
// localhost:3000/sinhVien/get-mssv?mssv=
router.get("/get-mssv", async function (req, res) {
    try {
        const { mssv } = req.query;
        const sinhVien = await sinhvienModel.findOne({ mssv: mssv });
        if (!sinhVien) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sinh viên" });
        }
        res.status(200).json(sinhVien);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

//5 - Thêm mới một sinh viên mới
// localhost:3000/sinhVien/add-sinhvien
router.post("/add-sinhvien", async function (req, res) {
    try {
        const sinhVien = new sinhvienModel(req.body);
        await sinhVien.save();
        res.status(201).json({ status: true, message: "Thêm sinh viên thành công", sinhVien });
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra", error: e.message });
    }
});
//6 - Thay đổi thông tin sinh viên theo mssv
// localhost:3000/sinhVien/update-mssv?mssv=
router.put("/update-mssv", async (req, res) => {
    const { mssv } = req.query;
    try {
        const sinhVien = await sinhvienModel.findOneAndUpdate({ mssv }, req.body, { new: true });
        if (!sinhVien) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sinh viên" });
        }
        res.status(200).json({ status: true, message: "Cập nhật thành công", sinhVien });
    } catch (error) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra", error: error.message });
    }
});

//7 - Xóa một sinh viên ra khỏi danh sách
// localhost:3000/sinhVien/delete-mssv?mssv=
router.delete("/delete-mssv", async function (req, res) {
    try {
        const { mssv } = req.query;
        const sinhVien = await sinhvienModel.findOneAndDelete({ mssv: mssv });
        if (!sinhVien) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sinh viên" });
        }
        res.status(200).json({ status: true, message: "Xóa sinh viên thành công", sinhVien });
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra", error: e.message });
    }
});

//8 - Lấy danh sách các sinh viên thuộc BM cntt và có DTB từ 9
// localhost:3000/sinhVien/get-sinhviens-cntt-tb9.0?boMon=cntt&diemTB=9
router.get("/get-sinhviens-cntt-tb9", async function (req, res) {
    try {
        const {boMon, diemTB} = req.query;
        const list = await sinhvienModel.find({ boMon: boMon, diemTB: { $gte: diemTB } });
        res.status(200).json(list);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

//9 - Lấy ra danh sách các sinh viên có độ tuổi từ 18 đến 20 thuộc cntt có điểm trung bình từ 6.5
// localhost:3000/sinhVien/get-sinhviens-tuoi-dtb?boMon=cntt&min=18&max=20&diemTB=6.5
router.get("/get-sinhviens-tuoi-dtb", async function (req, res) {
    try {
        const {boMon, min, max, diemTB} = req.query;
        const list = await sinhvienModel.find({
            boMon: boMon,
            tuoi: { $gte: min, $lte: max },
            diemTB: { $gte: diemTB }
        });
        res.status(200).json(list);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});


//10 - Sắp xếp danh sách sinh viên tăng dần theo dtb
// localhost:3000/sinhVien/get-sinhviens-sorted-by-diemTB
router.get("/get-sinhviens-sorted-by-diemTB", async function (req, res) {
    try {
        const list = await sinhvienModel.find().sort({ diemTB: 1 });
        res.status(200).json(list);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});
//11 - Tìm sinh viên có điểm trung bình cao nhất thuộc BM cntt
// làm không được





// email
router.post("/send-mail", async function (req, res, next) {
    try {
        const { to, subject, content } = req.body;

        const mailOptions = {
            from: 'luctqps38844@gmail.com',
            to: "tranphuongnam123lic@gmail.com",
            subject: 'nnn',
            html: 'mmmm'
        };

        await transporter.sendMail(mailOptions);

        res.json({ status: 1, message: "Gửi mail thành công" });
    } catch (err) {
        res.json({ status: 0, message: "Gửi mail thất bại"+err });
    }
});


// upload
router.post('/upload',[Upload.single('image')],
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