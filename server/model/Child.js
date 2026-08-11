const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
{
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    childName:{
        type:String,
        required:true,
        trim:true
    },

    gender:{
        type:String,
        enum:["Male","Female","Other"],
        required:true
    },

    dob:{
        type:Date,
        required:true
    },

    schoolName:{
        type:String,
        default:""
    },

    grade:{
        type:String,
        default:""
    },

    language:{
        type:String,
        default:"English"
    },

    city:{
        type:String,
        default:""
    },

    state:{
        type:String,
        default:""
    },

    address:{
        type:String,
        default:""
    },

    interests: 
    {
        type: [String],
        default:[]
    },

    goals:
        {
            type: [String],
            default:[]
        },
},
{
    timestamps:true
});

module.exports = mongoose.model("Child",childSchema);