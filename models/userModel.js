const mongoose = require("mongoose");
// schema = collection
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;
const user = new schema({

    id:{type:ObjectId},
    username:{type:String},
    password:{type:String},
    fullname:{type:String}

});

module.exports = mongoose.models.user || mongoose.model("user", user);