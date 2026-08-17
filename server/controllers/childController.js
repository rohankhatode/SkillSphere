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

// =======================
// Get Logged-in User's Children
// =======================
const getMyChildren = async (req, res) => {

    try {

        const children = await Child.find({
            parent: req.user.id
        });

        return res.status(200).json({
            success: true,
            children
        });

    } catch (err) {

        console.error("Get My Children Error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch children."
        });

    }
};

const updateInterests = async (req, res) => {

    try {

        const { interests } = req.body;

        if (!Array.isArray(interests)) {
            return res.status(400).json({
                success: false,
                message: "Interests must be an array."
            });
        }

        const child = await Child.findOneAndUpdate(
            {
                _id: req.params.id,
                parent: req.user.id
            },
            {
                interests
            },
            {
                new: true
            }
        );

        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Child not found or access denied."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Interests updated successfully.",
            child
        });

    } catch (err) {

        console.error("Update Interests Error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to update interests."
        });

    }
};

const updateGoals = async (req, res) => {

    try {

        const { goals } = req.body;

        if (!Array.isArray(goals)) {
            return res.status(400).json({
                success: false,
                message: "Goals must be an array."
            });
        }

        const child = await Child.findOneAndUpdate(
            {
                _id: req.params.id,
                parent: req.user.id
            },
            {
                goals
            },
            {
                new: true
            }
        );

        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Child not found or access denied."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Goals updated successfully.",
            child
        });

    } catch (err) {

        console.error("Update Goals Error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to update goals."
        });

    }
};
module.exports={ addChild, getMyChildren, updateInterests, updateGoals};