import React from "react";
import StepProgress from "../Components/StepProgress";
import childIllustration from "../assets/images/AddChild img.png";

function AddChild() {
  return (
    <div className="min-h-screen bg-[#FAFBFF]">

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Progress */}
        <StepProgress currentStep={1} />

        {/* Main Content */}
        <div className="mt-10 flex flex-col">

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              Tell Us About Your Child
            </h1>

            <p className="mt-3 text-gray-500 text-lg max-w-2xl">
              Help us personalize activities and recommendations by providing a
              few details about your child.
            </p>
          </div>

          {/* Form + Image */}
          <div className="relative">

            {/* Form */}
            <form className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Child Name */}
              <div>
                <label className="block mb-2 font-semibold">
                  Child Name
                </label>

                <input
                  type="text"
                  placeholder="Enter child name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-2 font-semibold">
                  Gender
                </label>

                <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <label className="block mb-2 font-semibold">
                  Date Of Birth
                </label>

                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              {/* School */}
              <div>
                <label className="block mb-2 font-semibold">
                  School Name
                </label>

                <input
                  type="text"
                  placeholder="Enter school name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              {/* Grade */}
              <div>
                <label className="block mb-2 font-semibold">
                  Grade
                </label>

                <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
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
                <label className="block mb-2 font-semibold">
                  Preferred Language
                </label>

                <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
                  <option>Select Language</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block mb-2 font-semibold">
                  City
                </label>

                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              {/* State */}
              <div>
                <label className="block mb-2 font-semibold">
                  State
                </label>

                <input
                  type="text"
                  placeholder="Enter state"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 font-semibold">
                  Address
                </label>

                <input
                  type="text"
                  placeholder="Enter address"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

            </form>

            {/* Bottom Section */}
            <div className="mt-16 flex items-end justify-between">

              {/* Illustration */}
              <div className="hidden lg:block">
                <img
                  src={childIllustration}
                  alt="Child Illustration"
                  className="w-72"
                />
              </div>

              {/* Button */}
              <button
                className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-10 py-4 rounded-full transition duration-300"
              >
                Next →
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddChild;