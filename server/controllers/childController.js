const Child = require("../model/Child");

const addChild = async(req,res)=>{

    try{
        const {
            childName,
            gender,
            dob,
            schoolName,
            grade,
            language,
            city,
            state,
            address
        } = req.body;

        const child = await Child.create({

            parent:req.user.id,

            childName,
            gender,
            dob,
            schoolName,
            grade,
            language,
            city,
            state,
            address
        });

        res.status(201).json({

            success:true,
            message:"Child Added Successfully",
            child
        });

    }

    catch(err){
        console.log(err);

        res.status(500).json({

            success:false,
            message:"Unable to Add Child"
        });
    }
};

const updateInterests = async (req, res) => {

    try {

        const { interests } = req.body;

        const child = await Child.findByIdAndUpdate(
            req.params.id,
            { interests },
            { returnDocument: "after" }
        );

        res.status(200).json({
            success: true,
            child
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const updateGoals = async (req, res) => {
  try {

    const { goals } = req.body;

    const child = await Child.findByIdAndUpdate(
      req.params.id,
      { goals },
      { returnDocument: "after" }
    );

    res.status(200).json({
      success: true,
      child,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Unable to update goals",
    });

  }
};
module.exports={ addChild, updateInterests, updateGoals};