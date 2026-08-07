import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/Vector.svg";
import phoneImage from "../assets/images/otp img.png";
import signupIllustration from "../assets/images/signup.png";
import { useEffect } from "react";
import API_URL from "../config/api";
// import { auth } from "../firebase/firebase";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";

function OTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);

  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//             size: "invisible",
//         }
//         );
//     }
//     };

    // 
    
    const sendOTP = () => {

    localStorage.setItem("devOTP", "123456");

    setOtp(["", "", "", "", "", ""]);

    inputs.current[0]?.focus();

    setTimer(45);

    alert("Development OTP: 123456");
};

    // const verifyOTP = async () => {
    // const code = otp.join("");

    // if (code.length !== 6) {
    //     alert("Please enter the complete OTP.");
    //     return;
    // }

    // try {
    //     if (!window.confirmationResult) {
    //         alert("OTP session expired. Please request OTP again.");
    //         return;
    //     }
    //     // Verify OTP with Firebase
    //     // await window.confirmationResult.confirm(code);
    //     const storedOTP = localStorage.getItem("devOTP");

    //         if (code !== storedOTP) {
    //             alert("Invalid OTP");
    //             return;
    //         }
    //     window.confirmationResult = null;

    //     // Get signup data saved from Signup page
    //     const signupData = JSON.parse(
    //     localStorage.getItem("signupData")
    //     )||null;

    //     if (!signupData) {
    //         alert("Signup session expired.");

    //         navigate("/signup");

    //         return;
    //     }

    //     // Send data to backend
    //     const response = await fetch(`${API_URL}/auth/signup`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(signupData),
    //     });

    //     const data = await response.json();

    //     if (!response.ok) {
    //     throw new Error(data.message);
    //     }

    //     // Save JWT Token
    //     localStorage.setItem("token", data.token);

    //     // Save user
    //     localStorage.setItem(
    //     "user",
    //     JSON.stringify(data.user)
    //     );

    //     // Remove temporary signup data
    //     localStorage.removeItem("signupData");
    //     if (window.recaptchaVerifier) {
    //         window.recaptchaVerifier.clear();
    //         window.recaptchaVerifier = null;
    //     }

    //     alert("Mobile Number Verified Successfully");

    //     setTimer(0);
    //     navigate("/welcome");

    // } catch (error) {
    //     console.log(error);
    //     if (error.code === "auth/invalid-verification-code") {
    //         alert("Incorrect OTP.");
    //     }
    //     else if (error.code === "auth/code-expired") {
    //         alert("OTP expired. Please resend OTP.");
    //     }
    //     else {
    //         alert(error.message || "OTP verification failed.");
    //     }
    // }
    // };

    const verifyOTP = async () => {

    const code = otp.join("");

    if (code.length !== 6) {
        alert("Please enter complete OTP.");
        return;
    }

    const storedOTP = localStorage.getItem("devOTP");

    if (code !== storedOTP) {
        alert("Invalid OTP");
        return;
    }

    const signupData =
        JSON.parse(localStorage.getItem("signupData"));

    if (!signupData) {
        alert("Signup session expired.");
        navigate("/signup");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        localStorage.removeItem("signupData");
        localStorage.removeItem("devOTP");

        alert("Mobile Number Verified Successfully");

        navigate("/welcome");

    } catch (err) {

        console.log(err);

        alert(err.message);

    }

};

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const signupData = JSON.parse(
        localStorage.getItem("signupData")
    );

    useEffect(() => {

        if (!signupData) {

            alert("Signup session expired.");

            navigate("/signup");

        }

    }, [signupData, navigate]);


  return (
    <div className="min-h-screen bg-white flex">

      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 py-16">
        <div className="mb-10 flex">

            <img src={logo} alt="SkillSphere" className="w-[32px] h-[32px]" />

            <p className="pl-3 font-medium text-[24px] text-[#7C3AED]">
            SkillSphere
            </p>
        </div>

        <p className="text-[#7C3AED] font-semibold text-[16px] mb-4">
            Join SkillSphere
        </p>

        <h1 className="text-[48px] font-bold leading-[1.1] text-black max-w-[650px]">
            Start Your{" "}
            <span className="text-[#7C3AED]">Child's Learning</span> Journey Today
        </h1>

        <p className="mt-6 text-[20px] leading-8 text-[#6B7280] max-w-[650px]">
            Create your parent account to discover trusted activities, connect with
            verified providers, and build a lifelong digital portfolio that celebrates
            every milestone, certificate, and achievement.
        </p>

        <div className="mt-8">
            <h5 className="text-[28px] font-bold text-black">
            Why Join SkillSphere?
            </h5>

            <div className="mt-6 space-y-5">
            
            <div className="flex gap-4">
                
                <div>
                <h3 className="font-semibold text-[16px] text-black">
                    Personalised Recommendations
                </h3>

                <p className="text-[14px] text-[#6B7280]">
                    Get activities and courses tailored to your child's interests
                    and age.
                </p>
                </div>
            </div>

            
            <div className="flex gap-4">
                
                <div>
                <h3 className="font-semibold text-[16px] text-black">
                    Trusted Activity Providers
                </h3>

                <p className="text-[14px] text-[#6B7280]">
                    Explore verified institutes, academies, and learning centers
                    near you.
                </p>
                </div>
            </div>

            
            <div className="flex gap-4">
                
                <div>
                <h3 className="font-semibold text-[16px] text-black">
                    Digital Certificate Vault
                </h3>

                <p className="text-[14px] text-[#6B7280]">
                    Store every certificate securely in one organized place.
                </p>
                </div>
            </div>

            
            <div className="flex gap-4">
                
                <div>
                <h3 className="font-semibold text-[16px] text-black">
                    Track Growth & Progress
                </h3>

                <p className="text-[14px] text-[#6B7280]">
                    Monitor skills, achievements, and learning milestones from a
                    single dashboard.
                </p>
                </div>
            </div>
        </div>
    </div>
    

        {signupIllustration && (
            <div className="relative w-full max-w-[540px] h-[290px] mt-10">
            <img src={signupIllustration} alt="Parent and child"
                className="w-[485px] h-[370px] object-contain"/>
            </div>
        )}
    </div>
        {/* RIGHT SIDE */}

        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-16 lg:py-16">
        <div className="w-full max-w-[650px] mt-6 lg:mt-16">

          <div className="border rounded-3xl p-10 w-[650px]">

            <img
              src={phoneImage}
              alt=""
              className="w-[360px] h-[285px] mx-auto flex justify-center items-center"
            />

            <h1 className="text-[32px] font-bold text-center mt-6">
              Verify Your Mobile Number
            </h1>

            <p className="text-[16px] text-gray-500 text-center mt-4">
              Almost there! Enter the 6-digit verification code sent to 

            <span className="font-semibold text-violet-600">
            +91 {signupData?.phoneNumber}
            </span>
            </p>

            {/* OTP BOXES */}

            <div className="flex justify-center gap-4 mt-10">

              {otp.map((digit, index) => (

                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  placeholder="-" 
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-[80px] h-[60px] border rounded-3xl text-center text-2xl focus:border-violet-600 outline-none"
                />

              ))}

            </div>

            <p className="text-center mt-8 text-gray-500">
              Resend code in
              <span className="text-violet-600 font-semibold">
                {" "}
                00:{timer.toString().padStart(2, "0")}
              </span>
            </p>
              <div id="recaptcha-container"></div>
            <button
              onClick={verifyOTP}
              className="w-full mt-8 bg-violet-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-violet-700"
            >
              Verify OTP
            </button>

            <div className="text-center mt-8">
              <p className="text-gray-500">
                Didn't receive the code?

              <button
                disabled={timer > 0}
                onClick={sendOTP}
                className={`ml-2 ${
                    timer > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-violet-600"
                }`}
            >
                Resend OTP
            </button>
              </p>

              <button
                className="text-gray-600 mt-2"
                onClick={() => navigate("/signup")}
                >
                Change Mobile Number
                </button>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}


export default OTP;