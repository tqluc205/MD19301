const mongoose = require("mongoose");
// schema = collection
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;
const sinhvien = new schema({
    id:{type:ObjectId},
    mssv:{type:String},
    hoten:{type:String},
    diemTB:{type:Number},
    boMon:{type:String},
    tuoi:{type:Number}
});
module.exports = mongoose.models.sinhvien || mongoose.model("sinhvien", sinhvien);