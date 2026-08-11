const mongoose = require("mongoose");

const activitySchema =
new mongoose.Schema({

    child:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Child"
    },

    message:String,

    date:Date

});

module.exports =
mongoose.model(
    "Activity",
    activitySchema
);