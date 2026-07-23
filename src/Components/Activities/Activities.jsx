import activity from "../../assets/images/activities-bg.png";
import { FaArrowRight } from "react-icons/fa";

function Activities() {
    return (
        <section className="w-full py-20">

            <div
                className="relative max-w-[1320px] h-[435px] mx-auto rounded-[24px] bg-cover bg-center"
                style={{ backgroundImage: `url(${activity})` }}>

                <div className="w-full h-full flex justify-center items-center">

                    <div className="max-w-[740px] flex flex-col items-center text-center">

                        <h2 className="text-white text-[48px] font-bold">
                            Their Potential Is Already There.
                            <br />
                            Help Them Shape It.
                        </h2>

                        <p className="text-white text-[24px]">
                            Discover opportunities, build real skills, and create 
                            a portfolio that tells their complete growth story.
                        </p>

                        <button className="mt-3 w-[185px] h-[45px] rounded-full bg-white text-[#7C3AED] 
                            font-semibold flex justify-center items-center gap-2">

                            Explore Activities
                            <FaArrowRight/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Activities;