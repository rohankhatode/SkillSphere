import growth from "../../assets/icons/growth.svg";
import growthImg from "../../assets/images/sun.svg"
import orbit from "../../assets/images/orbit.svg"
import confidence from "../../assets/icons/confidence.svg";
import search from "../../assets/icons/global-search.svg";
import fitImg from "../../assets/images/fit image.svg";

import certificate from "../../assets/images/Why Choose Img 2.svg";
import robot from "../../assets/images/Why choose Img 1.svg";
function WhyChoose() {
    return(
        <section className="w-full mt-1">
            <div className="max-w-[600px] mx-auto h-[170px] text-center">

                <p className="text-center text-[17px] text-[#7C3AED] font-medium">
                    Why Skillsphere
                </p>

                <h2 className="mt-2 text-[50px] font-bold">

                    <span className="text-black">Why Choose</span>
                    <span className="text-[#7C3AED]"> SkillSphere</span>
                </h2>

                <p className="mt-4 max-w-[440px] mx-auto text-center text-[17px] text-[#6B7280]">
                    Everything your child needs to discover interests, build 
                    skills, and track their growth.
                </p>
            </div>

            <div className="max-w-[1320px] mx-auto mt-16 flex justify-between gap-6">

            <div className="flex flex-col gap-6">

                <div className="w-[420px] h-[350px] rounded-[24px] overflow-hidden">

                    <img src={robot} alt="" className=" w-full h-full object-cover"/>
                </div>

                <div className="relative w-[420px] h-[350px] bg-[#F8F6FF] rounded-[24px] p-7 flex flex-col justify-end">

                    <img src={search} alt="" className="w-[48px] h-[48px]" />

                        <img src={fitImg} alt="" className=" absolute top-0 right-0 p-5" />

                        <h3 className="pt-5 text-[18px] font-bold text-[#111827]">
                            Find the Right Fit
                        </h3>

                        <p className="pt-3 text-[16px] text-[#6B7280]">
                            Discover activities that match your child's interests, strength and preferences. 
                            Explore opportunities that help them learn, enjoy, and grow with confidence.
                        </p>
                </div>
            </div>

            <div>
                <div className="w-[420px] h-[725px] bg-[#F8F6FF] rounded-[24px] relative">
                    <div className="relative w-[430px] h-[430px]">

                        <img src={orbit} alt="" className="absolute w-[420px] h-[420px]" />

                    </div>

                    <div className="px-6 pt-14 flex flex-col justify-end">

                        <img src={confidence} alt="" className="w-[45px] h-[45px]"/>

                        <h3 className="pt-8 text-[18px] font-bold text-[#111827]">
                            Choose with Confidence
                        </h3>

                        <p className="pt-3 text-[16px] text-[#6B7280]">
                            Explore trusted institutions, compare programs, and make informed decisions. 
                            Find the right learning environment based on clear and reliable information.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="relative w-[420px] h-[350px] bg-[#F8F6FF] rounded-[24px] p-6 flex flex-col justify-end">

                    <img src={growthImg} alt="" className="absolute top-0 right-0 w-[180px] opacity-100"/>

                    <img src={growth} alt="" className="w-[45px] h-[45px]"/>

                    <h3 className="text-[18px] font-bold text-[#111827] pt-5">
                        See Their Growth
                    </h3>

                    <p className="pt-3 text-[16px] text-[#6B7280] mx-auto">
                        Track skills, progress, achievements, and important learning milestones in one place.
                        Understand how there abilities develope throughout there learning journey.
                    </p>
                </div>

                
                    <div className="w-[420px] h-[350px] rounded-[24px] overflow-hidden">

                        <img src={certificate} alt="Graduate" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChoose;