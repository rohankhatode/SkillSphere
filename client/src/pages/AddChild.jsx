import React from "react";
import StepProgress from "../Components/StepProgress";
import { useNavigate } from "react-router-dom";
import childIllustration from "../assets/images/AddChild img.png";
import logo from "../assets/icons/Vector.svg";
import { HiArrowRight } from "react-icons/hi";
import API_URL from "../config/api";
import { useState } from "react";

function AddChild() {
  const navigate = useNavigate();
  const [formData,setFormData]=useState({

    childName:"",
    gender:"",
    dob:"",
    schoolName:"",
    grade:"",
    language:"",
    city:"",
    state:"",
    address:""

});

  const handleChange=(e)=>{

    setFormData({

        ...formData,
        [e.target.name]:e.target.value

    });

  };

  const handleSubmit=async()=>{

    try{

        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

          console.log(localStorage.getItem("token"));
          console.log(sessionStorage.getItem("token"));

      const response = await fetch(`${API_URL}/child/add`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
      });

        const data=await response.json();

          if(response.ok){

            localStorage.setItem("childId", data.child._id);

            navigate("/interests");

          }
          else{

            alert(data.message);

          }

        }

        catch(err){

          console.log(err);
          alert("Unable to Add Child");}
    };
  
    return (
    <div className="min-h-screen bg-gray-50">

      <div className="w-[1320px] mx-auto py-8">

        {/* Logo */}
        <div className="w-[162px] h-[32px] flex items-center gap-3 mb-12">
          <img src={logo} alt="SkillSphere" className="w-[32px] h-[32px]" />

          <h1 className="text-2xl font-medium text-[#7C3AED]">
            SkillSphere
          </h1>
        </div>

        {/* Progress Strip */}
        <StepProgress currentStep={1} />

        {/* Heading */}
        <div className="w-[1380px] h-[95px] mt-10">
          <h2 className="text-[48px] font-bold text-black">
            Tell Us <span className="text-[#7C3AED]">About</span> Your <span className="text-[#7C3AED]">Child</span>
          </h2>

          <p className="mt-3 text-[20px] text-gray-600">
            Help us personalize activities, courses, and learning opportunities
            based on your child's age, interests, and goals.
          </p>
        </div>

        {/* Form */}
        <div className="mt-16">

          <form className="grid grid-cols-3 gap-8">

            {/* Child Name */}
            <div>
              <label className="font-medium text-[16px]">Child Name</label>

              <input
                type="text"
                placeholder="Enter Child Name"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="font-medium text-[16px]">Gender</label>

              <select
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className="font-medium text-[16px]">Date Of Birth</label>

              <input
                type="date"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            {/* School */}
            <div>
              <label className="font-medium text-[16px]">School Name</label>

              <input
                type="text"
                placeholder="Enter School Name"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
              />
            </div>

            {/* Grade */}
            <div>
              <label className="font-medium text-[16px]">Grade</label>

              <select 
              className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              >
                <option>Select Grade</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="font-medium text-[16px]">Preferred Language</label>

              <select 
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option>Select Language</option>
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="font-medium text-[16px]">City</label>

              <input
                type="text"
                placeholder="Enter City"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            {/* State */}
            <div>
              <label className="font-medium text-[16px]">State</label>

              <input
                type="text"
                placeholder="Enter State"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-medium text-[16px]">Address</label>

              <input
                type="text"
                placeholder="Enter Address"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

          </form>
          <div className="flex justify-end mt-8">
          <button onClick={handleSubmit}
              className="bg-violet-600 text-white flex items-center gap-2 px-10 py-3 rounded-full hover:bg-violet-700"
            >
              Next 
              <HiArrowRight className="font-bold" />
            </button>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-end">

            <img
              src={childIllustration}
              alt="Child"
              className="w-72"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddChild;