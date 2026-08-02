import { useState } from "react";
import all from "../../assets/icons/all.svg";
import designer from "../../assets/icons/designer.svg";
import sports from "../../assets/icons/sports.svg";
import technology from "../../assets/icons/technology.svg";
import coding from "../../assets/icons/coding.svg";
import music from "../../assets/icons/music.svg";
import robotics from "../../assets/icons/robotics.svg";
import CourseCard from "../CourseCard/CourseCard";
import course1 from "../../assets/images/course1.png";
import course2 from "../../assets/images/course2.png";
import course3 from "../../assets/images/course3.png";
import course4 from "../../assets/images/course4.png";
import avatar1 from "../../assets/icons/avatar1.png";
import avatar2 from "../../assets/icons/avatar2.png";
import avatar3 from "../../assets/icons/avatar3.png";
import avatar4 from "../../assets/icons/avatar4.png";
import { FaArrowRight } from "react-icons/fa";

function PopularCourses() {
  const tabs = [
    {
      name: "All",
      icon: all,
    },
    {
      name: "Designer",
      icon: designer,
    },
    {
      name: "Sports",
      icon: sports,
    },
    {
      name: "Technology",
      icon: technology,
    },
    {
      name: "Coding",
      icon: coding,
    },
    {
      name: "Music & Dance",
      icon: music,
    },
    {
      name: "Robotics",
      icon: robotics,
    }
  ];

  const [activeTab, setActiveTab] = useState("Designer");

  const courses = [
  {
    image: course1,
    type: "Course",
    rating: "4.9",
    title: "Full Stack Web Development",
    avatar: avatar1,
    provider: "SkillSphere",
  },

  {
    image: course2,
    type: "Course",
    rating: "4.8",
    title: "Professional Cricket Academy",
    avatar: avatar2,
    provider: "Sports Club",
  },

  {
    image: course3,
    type: "Activity",
    rating: "5.0",
    title: "Guitar For Beginners",
    avatar: avatar3,
    provider: "Music Academy",
  },

  {
    image: course4,
    type: "Course",
    rating: "4.7",
    title: "UI UX Design Masterclass",
    avatar: avatar4,
    provider: "Creative Studio",
  }
];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto">

        <p className="text-center text-[#7C3AED] text-[17px] font-medium">
          Trending Now
        </p>

        <h2 className="mt-2 text-center text-[50px] font-bold">
          <span className="text-black">Most Popular</span>
          <span className="text-[#7C3AED]"> Activity & Courses</span>
        </h2>

        <p className="mt-4 max-w-[420px] mx-auto text-center text-[17px] text-[#6B7280]">
          Explore the most loved activities and courses chosen by students and
          parents across SkillSphere.
        </p>

        <div className="mt-10 flex justify-center border-b border-[#E5E7EB]">

          {tabs.map((tab, index) => (

            <button
              key={index}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-12 pb-5 transition-all
                ${
                  activeTab === tab.name
                    ? "border-b-[3px] border-[#7C3AED] text-[#7C3AED] font-medium"
                    : "text-[#6B7280] hover:text-[#7C3AED]"
                }
              `}>
              <img src={tab.icon} alt={tab.name} className="w-5 h-5"/>

              <span className="text-[16px]">
                {tab.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="w-[1400px] h-[470px] mx-auto mt-5 flex justify-between">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            type={course.type}
            rating={course.rating}
            avatar={course.avatar}
            provider={course.provider}/>
        ))}
      </div>
      <div className="w-full flex justify-center">

        <button className="w-[220px] h-[55px] rounded-full bg-[#7C3AED] flex items-center
                    justify-center gap-3 text-white font-medium text-[16px]
                    shadow-[4px_6px_0px_0px_#361F5F] hover:bg-[#6D28D9] hover:shadow-lg">
          See All Courses

          <FaArrowRight />

        </button>
      </div>
    </section>
  );
}

export default PopularCourses;