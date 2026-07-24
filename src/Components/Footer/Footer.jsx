import vector from "../../assets/icons/Vector.svg";

function Footer() {
    return (
        <footer className="w-full bg-white">

            <div className="border-t border-[#E5E7EB]"></div>

            <div className="max-w-[1320px] mx-auto pt-12">
                <div className="flex justify-between items-start">

                    <div>

                        <div className="flex items-center gap-3">

                            <img src={vector} alt="Logo" className="w-[32px] h-[32px]"/>

                            <h2 className="text-[#7C3AED] text-[24px] font-bold">
                                SkillSphere
                            </h2>
                        </div>
                        <div className="flex gap-12 mt-8 text-[16px] text-[#4B5563]">

                            <a href="/">Home</a>
                            <a href="/">About Us</a>
                            <a href="/">Contact Us</a>
                            <a href="/">Careers</a>
                            <a href="/">Help</a>
                            <a href="/">Privacy</a>

                        </div>
                    </div>

                    <div>

                        <p className="text-[14px] font-semibold mb-4">
                            Join our newsletter
                        </p>

                        <div className="flex">

                            <input type="email" placeholder="Enter your email"
                            className="w-[250px] h-[48px] border border-gray-300 px-4 outline-none"/>

                            <button className="w-[120px] h-[48px] bg-[#7C3AED] text-white font-semibold">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#E5E7EB] mt-10"></div>
                <div className="flex justify-between items-center py-6">

                    <p className="text-[14px] text-[#6B7280]">
                        © Lorem Ipsum, All Right Reserved.
                    </p>

                    <div className="flex gap-10 text-[14px] text-[#6B7280]">

                        <a href="/">Terms</a>
                        <a href="/">Privacy</a>
                        <a href="/">Cookies</a>

                    </div>
                </div>
            </div>
            <div className="w-full h-[290px] overflow-hidden mt-8">

                <h1 className="text-[280px] font-bold text-[#7C3AED] opacity-10 text-center">
                    SkillSphere
                </h1>

            </div>
        </footer>
    );
}

export default Footer;
