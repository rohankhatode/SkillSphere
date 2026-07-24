import faq from "../../assets/images/faq-img.svg";

function FAQ() {
    return (
        <section className="w-full pt-20">

            <div className="max-w-[1440px] h-[395px] mx-auto flex gap-[40px] bg-[#F5F3FF] px-[60px] py-[40px]">
                <div className="w-[620px] h-[200px]">

                    <p className="text-[#7C3AED] font-semibold text-[16px]">
                        Frequently Asked Question
                    </p>

                    <h2 className="w-[620px] text-[48px] font-bold">
                        <span className="text-black">Common Questions About{" "}</span> 
                        <span className="text-[#7C3AED]"> SkillSphere</span>
                    </h2>

                    <p className="mt-1 w-[515px] text-[#6B7280] text-[18px]">
                        Find answers about discovering activities, connecting with institutions,
                        and managing student achivements on SkillSphere.
                    </p>

                    <img src={faq} alt="" className="w-[110px] h-[110px] mt-4"/>

                </div>

                <div className="w-[665px] h-[300px] space-y-2">

                    <div className="w-[665px] h-[105px] p-[16px] rounded-[20px] bg-[#ffffff] px-[16px] py-[10px]">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-[16px]">
                                What is SkillSphere?
                            </h3>
                            <button className="w-[24px] h-[24px] text-[24px] text-[#7C3AED] bg-[#F5F3FF] flex justify-center items-center">−</button>
                        </div>

                        <p className="mt-2 text-[#6B7280] text-[14px]">
                            SkillSphere is a student activity discovery platform that helps students
                            find extracurricular activities, explore institutions, and manage certificates 
                            and achievements in one place.
                        </p>
                        
                    </div>

                    <div className="h-[55px] rounded-[16px] p-[16px] border flex justify-between items-center">
                        <h3 className="font-semibold text-[16px]">
                            How do I find activities?
                        </h3>
                        <button className="w-[24px] h-[24px] text-[24px] text-[#7C3AED] bg-[#F5F3FF] flex justify-center items-center">+</button>
                    </div>

                    <div className="h-[55px] rounded-[16px] p-[16px] border flex justify-between items-center">
                        <h3 className="font-semibold text-[16px]">
                            Can I find activities near me?
                        </h3>
                        <button className="w-[24px] h-[24px] text-[24px] text-[#7C3AED] bg-[#F5F3FF] flex justify-center items-center">+</button>
                    </div>

                    <div className="h-[55px] rounded-[16px] p-[16px] border flex justify-between items-center">
                        <h3 className="font-semibold text-[16px]">
                            What is a Skill Portfolio?
                        </h3>
                        <button className="w-[24px] h-[24px] text-[24px] text-[#7C3AED] bg-[#F5F3FF] flex justify-center items-center">+</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;