import certificateImg from "../../assets/images/certificate.svg";
import certificate from "../../assets/icons/certificate.png";
import profile from "../../assets/icons/profile.png";
import verified from "../../assets/icons/verified.png";
import access from "../../assets/icons/access.png";

function Certificate() {
    return(
        <section className="w-full bg-[#F8F7FF] h-[580px] my-14">
            <div className="max-w-[1320px] mx-auto flex items-center gap-10">
                <div className="max-w-[520px] h-[500px] mx-auto flex">

                    <img src={certificateImg} alt="verified certificates" className="w-[520px] h-[500px] mt-11"/>

                </div>

            <div className="w-[650px] h-[460px]">

                <p className="text-[#7C3AED] h-[24px] text-[16px] font-semibold">
                    Certificate Management
                </p>

                <h2 className="mt-3 text-[48px] h-[115px] font-bold">
                    <span className="text-black">
                        Every Achievement.
                    </span>

                    <br />
                    <span className="text-[#7C3AED]">
                         One Growing Portfolio.
                    </span>
                </h2>

            <p className="mt-6 h-[54px] text-[17px] text-[#6B7280]">
                Store every activity, certificate, skill, and milestone in one
                secure portfolio that grows with your child-organized,
                accessible, and ready to share.
            </p>

            <div className="mt-6 h-[235px] flex flex-col gap-6">

                <div className="flex items-start gap-[12px]">

                    <img src={verified} alt="" className="w-[45px] h-[45px]" />

                <div className="w-[650px] h-[45px]">

                    <h4 className="text-[16px] font-bold text-[#111827]">
                    Verified Digital Certificates
                    </h4>

                    <p className="mt-2 text-[14px] text-[#6B7280]">
                    Certificates confirmed by trusted activity providers.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-[12px]">

                <img src={certificate} alt="" className="w-[45px] h-[45px]" />

                <div className="w-[650px] h-[45px]">

                    <h4 className="text-[16px] font-bold">
                        Easy Certificate Management
                    </h4>

                    <p className="mt-2 text-[14px] text-[#6B7280]">
                    Organise every certificate and achievement in one simple
                    place.
                    </p>
                </div>
                </div>

                <div className="flex items-start gap-[12px]">

                <img src={profile} alt="" className="w-[45px] h-[45px]"/>

                <div className="w-[650px] h-[45px]">

                    <h4 className="text-[16px] font-bold">
                    One Student Profile
                    </h4>

                    <p className="mt-2 text-[14px] text-[#6B7280]">
                    Keep every certificate connected to your child's profile.
                    </p>
                </div>
                </div>

                <div className="flex items-start gap-[12px]">

                <img src={access} alt="" className="w-[45px] h-[45px]" />

                <div className="w-[650px] h-[45px]">

                    <h4 className="text-[16px] font-bold">
                    Always Accessible
                    </h4>

                    <p className="mt-2 text-[14px] text-[#6B7280]">
                    Access certificates anytime, from any device.
                    </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}

export default Certificate;