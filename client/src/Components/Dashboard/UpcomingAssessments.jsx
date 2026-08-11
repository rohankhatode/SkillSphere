import React from "react";
import {
  MapPin,
  Star,
  Bookmark,
  Share2,
  ArrowRight,
} from "lucide-react";

import creativeImage from "../../assets/images/dashboard img1.png";
import robotImage from "../../assets/images/dashboard img2.png";
import sportsImage from "../../assets/images/dashboard img3.png";

const opportunities = [
  {
    id: 1,
    title: "Creative Minds Studio",
    category: "Design & Art",
    image: creativeImage,
    location: "Powai, Mumbai",
    rating: "4.8",
    ages: "8–14",
    mode: "Offline",
  },
  {
    id: 2,
    title: "FutureBots Lab",
    category: "Robotics & STEM",
    image: robotImage,
    location: "Andheri, Mumbai",
    rating: "4.9",
    ages: "8–14",
    mode: "Hybrid",
  },
  {
    id: 3,
    title: "KickStart Sports",
    category: "Sports",
    image: sportsImage,
    location: "Bandra, Mumbai",
    rating: "4.7",
    ages: "8–14",
    mode: "Offline",
  },
];

function UpcomingAssessments() {
  return (
    <section className="mt-8">
      <div className="mb-4">

        <h2 className="text-[16px] font-bold text-black">
          Upcoming Exam
        </h2>

        <p className="text-[14px] text-gray-500 mt-1">
          Next scheduled assessment
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">

        {opportunities.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              rounded-2xl
              border
              border-gray-200
              overflow-hidden
              shadow-sm
              hover:shadow-md
              transition-shadow
            ">

            <div className="relative h-[130px] overflow-hidden">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

            </div>

            {/* Card Content */}
            <div className="p-4">
              <div className="flex justify-between items-start gap-2">

                <div>
                  <h3 className="text-[16px] font-bold text-[#111827]">
                    {item.title}
                  </h3>

                  <p className="text-[14px] text-gray-500 mt-1">
                    {item.category}
                  </p>
                </div>

                <span className="bg-[#F3E8FF] text-[#7C3AED] px-2 py-1 rounded-full text-[12px] font-medium">
                  {item.mode}
                </span>

              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1">

                  <MapPin
                    size={13}
                    className="text-gray-500"
                  />

                  <span className="text-[12px] text-gray-500">
                    {item.location}
                  </span>
                </div>

                <div className="flex items-center gap-1">

                  <Star
                    size={13}
                    fill="#F59E0B"
                    className="text-[#F59E0B]"
                  />

                  <span className="text-[12px] text-gray-500">
                    {item.rating}
                  </span>

                </div>

                <span className="text-[12px] text-gray-500">
                  Ages {item.ages}
                </span>

              </div>

              <div className="flex items-center gap-2 mt-4">

                <button
                  className="
                    flex-1
                    h-[38px]
                    bg-[#7C3AED]
                    hover:bg-[#6D28D9]
                    text-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-[14px]
                    font-semibold
                    transition
                  ">
                  Join Now

                  <ArrowRight size={15} />
                </button>

                <button
                  className="
                    w-[40px]
                    h-[40px]
                    rounded-full
                    bg-[#F8F7FF]
                    border
                    border-[#E9E5FF]
                    flex
                    items-center
                    justify-center
                    text-gray-700
                    hover:text-[#7C3AED]
                  ">
                  <Bookmark size={16} />
                </button>

                {/* Share */}
                <button
                  className="
                    w-[40px]
                    h-[40px]
                    rounded-full
                    bg-[#F8F7FF]
                    border
                    border-[#E9E5FF]
                    flex
                    items-center
                    justify-center
                    text-gray-700
                    hover:text-[#7C3AED]
                  ">
                  <Share2 size={16} />
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default UpcomingAssessments;