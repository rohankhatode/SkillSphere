

const mongoose = require("mongoose");

const courseSchema =
new mongoose.Schema({

    title:String,

    category:String,

    city:String,

    rating:Number,

    ageGroup:String,

    image:String,

    mode:{
        type:String,
        enum:[
            "Online",
            "Offline",
            "Hybrid"
        ]
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "Course",
    courseSchema
);