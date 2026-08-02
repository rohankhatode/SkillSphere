import { Icon } from "@iconify/react";
import heroBg from "../../assets/images/hero-bg.png";
import Navbar from "../Navbar/Navbar";

function Hero() {
  return (
    <section
      className="relative w-full pb-20 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}>
      
      <Navbar />

      <div className="max-w-[1440px] mx-auto flex flex-col items-center pt-[150px]">

        <div
          className="flex items-center gap-2 bg-white rounded-full px-5 py-2">
          <Icon icon="hugeicons:job-link" className="text-[#1B2A52]"/>

          <span className="text-[12px] font-medium text-[#1B2A52]">
            Discover • Learn • Build Your Future
          </span>
        </div>

        <h1
          className="mt-8 text-center font-bold text-[70px] leading-[90px]">
          <span className="text-[#0F2E6D]">
            Discover the Right Activities.
          </span>
          <br />

          <span className="text-[#7C3AED]">
            Build Your Future.
          </span>
        </h1>

        <p
          className="mt-5 max-w-[850px] text-center text-[15px] text-[#4B5563]">
            Discover verified extracurricular activity providers near you,
            compare trusted institutions, and build your lifelong Skill Portfolio
            by showcasing your achievements, certificates, and skills-all in one
            place.
        </p>

        <div className="flex items-center mt-10">
          <div
            className="flex items-center bg-white rounded-full shadow-lg h-[55px] w-[500px]
              overflow-hidden">
            
            <div className="flex items-center flex-1 px-4">

              <Icon icon="solar:magnifer-linear" className="text-[#0F0F0F]" />

              <input type="text" placeholder="Dance, Coding, Robotics, Music..."
                className="ml-3 w-full outline-none text-[14px] text-[#374151]" />
            </div>

            <div className="w-px h-8 bg-gray-200"></div>

            <div className="flex items-center px-5">

              <Icon
                icon="solar:map-point-linear" width="20" className="text-[#0F0F0F]" />

              <input
                type="text"
                placeholder="Mumbai, Maharashtra"
                className="ml-3 w-full outline-none text-[14px] text-[#374151]" />

            </div>
          </div>

          <button
            className="ml-4 w-[150px] h-[50px] rounded-full bg-[#7C3AED] text-white font-bold
              text-[15px] hover:bg-[#6D28D9]">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;