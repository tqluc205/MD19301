const mongoose = require("mongoose");
// schema = collection
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;
const product = new schema({
    id:{type:ObjectId},
    masp:{type:String},
    tensp:{type:String},
    gia:{type:Number},
    soluong:{type:String},
    user:{type:ObjectId, ref:"user"}
});
module.exports = mongoose.models.product || mongoose.model("product", product);