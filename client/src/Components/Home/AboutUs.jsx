import AboutUs1 from "../../assets/images/About us 1.png";
import AboutUs2 from "../../assets/images/About us 2.png";
import Hashtag from "./Hashtag";

function AboutUs() {
    return(
        <>
        <Hashtag />
        
        <section className="w-full py-5">

            <div className="max-w-[1320px] mx-auto h-[480px] flex gap-[20px]">
                <div className="w-[420px] h-[480px]">

                <img src={AboutUs1} alt="" className="w-full h-full rounded-[20px] "/>

                </div>

                <div className="w-[875px] h-[460px]">

                    <p className="mt-2 text-[#7C3AED] text-[16px] font-semibold">
                        About Us
                    </p>

                    <h2 className="mt-3 text-[48px] h-[220px] font-bold text-[#111827]">
                        We help every child discover their strengths, build real skills, 
                        and shape a future full of possibilities.
                    </h2>

                     <div className="flex items-end gap-8 h-[217px]">

                        <div className="w-[430px] h-[215px] pt-[20px]">

                            <img src={AboutUs2} alt="" className="w-full h-full rounded-[20px]"/>

                        </div>

                        <p className="w-[430px] h-[140px] text-[24px] text-[#6B7280]">
                            SkillSphere brings learning, activities, achievements,and certificates 
                            together-helping parents support every step of their child's growth journey.
                        </p>
                    </div>
                </div>
            </div>  
        </section>
        </>
    )
}

export default AboutUs;