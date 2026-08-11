const mongoose = require("mongoose");

const certificateSchema =
new mongoose.Schema({

    child:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Child"
    },

    title:String,

    issuedBy:String,

    issueDate:Date

});

module.exports =
mongoose.model(
    "Certificate",
    certificateSchema
);