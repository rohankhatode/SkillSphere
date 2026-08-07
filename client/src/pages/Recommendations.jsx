
import CourseCard from "../Components/Home/CourseCard";
import course1 from "../assets/images/course1.png";
import course2 from "../assets/images/course2.png";
import course3 from "../assets/images/course3.png";
import course4 from "../assets/images/course4.png";
import avatar1 from "../assets/icons/avatar1.png";
import avatar2 from "../assets/icons/avatar2.png";
import avatar3 from "../assets/icons/avatar3.png";
import avatar4 from "../assets/icons/avatar4.png";
import { useNavigate } from "react-router-dom";
import StepProgress from "../Components/StepProgress";
import logo from "../assets/icons/Vector.svg";
import { HiArrowRight } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";

function Recommendations() {

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

const navigate = useNavigate();

  const handleNext = () => {

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF]">

      <div className="max-w-[1320px] mx-auto py-8">

        {/* Logo */}

        <div className="flex items-center mb-8">

          <img
            src={logo}
            alt="SkillSphere"
            className="w-8 h-8"
          />

          <h2 className="ml-3 text-2xl font-semibold text-[#7C3AED]">
            SkillSphere
          </h2>

        </div>

        {/* Progress Strip */}

        <StepProgress currentStep={4} />
        

        {/* Heading */}

        <div className="mt-14">

          <h1 className="text-[48px] font-bold text-black">
            Recommended for your child
          </h1>

          <p className="text-gray-500 text-[20px] mt-3">
            Based on their interest and goals
          </p>

        </div>

        {/* Interest Cards */}

        <div
        className="w-[1380px] h-[400px] mx-auto mt-5 flex justify-between">
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

        {/* Buttons */}

        <div className="flex justify-between mt-16">

          <button
            onClick={() => navigate("/goals")}
            className="flex items-center gap-2 border-2 border-[#7C3AED] text-[#7C3AED] px-10 py-4 rounded-full font-semibold hover:bg-[#F5F0FF]"
          >
            <HiArrowLeft className="font-bold mt-1" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6B2FFF] text-white px-12 py-4 rounded-full font-semibold"
          >
            Next 
            <HiArrowRight className="font-bold" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default Recommendations;
