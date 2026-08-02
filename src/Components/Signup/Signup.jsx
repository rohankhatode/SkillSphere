import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/Vector.svg";
import signupIllustration from "../../assets/images/login page.png";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(formData.phoneNumber.trim())) {
      setError("Enter a valid 10-digit mobile number");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://skill-sphere-api.vercel.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email.toLowerCase().trim(),
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);

        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Server is not running.");
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignup = useGoogleLogin({

      onSuccess: async (tokenResponse) => {

          try {

              const response = await fetch(
                  "https://www.googleapis.com/oauth2/v3/userinfo",
                  {
                      headers: {
                          Authorization: `Bearer ${tokenResponse.access_token}`,
                      },
                  }
              );

              const user = await response.json();

              const backendResponse = await fetch(
                  "https://skill-sphere-api.vercel.app/api/auth/google",
                  {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          fullName: user.name,
                          email: user.email,
                          picture: user.picture,
                      }),
                  }
              );

              const data = await backendResponse.json();

              if (backendResponse.ok) {

                  localStorage.setItem("token", data.token);
                  localStorage.setItem("user", JSON.stringify(data.user));

                  if (data.isNewUser) {

                      navigate("/phone-verification");

                  } else {

                      navigate("/dashboard");

                  }

              } else {

                  setError(data.message || "Google Signup Failed");

              }

          } catch (err) {

              console.error(err);
              setError("Unable to connect to server.");

          }

      },

      onError: () => {

          setError("Google Sign-Up Failed");

      }

  });

  const handleAppleSignup = () => {
    console.log("Apple signup clicked");
    
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

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
              className="w-full h-[290px] object-contain"/>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-start justify-center px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="w-full max-w-[650px] mt-8 lg:mt-16">
          
          <div className="w-full rounded-[24px] border border-[#E8E2FF] p-6 sm:p-8 lg:p-10 mt-24">
            <h3 className="text-[38px] lg:text-[38px] font-bold text-black">
              Create Your Parent Account
            </h3>

            <form onSubmit={handleSignup} className="mt-8 space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-[16px] font-semibold text-black mb-2">
                  Full Name
                </label>
                
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full h-[48px] px-4 border border-[#E8E2FF] rounded-[16px] focus:border-[#7C3AED] focus:outline-none text-[15px] text-black placeholder:text-[#9CA3AF] transition"/>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[16px] font-semibold text-black mb-2">
                  Email Address
                </label>
                
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full h-[48px] px-4 border border-[#E8E2FF] rounded-[16px] focus:border-[#7C3AED] focus:outline-none text-[15px] text-black placeholder:text-[#9CA3AF] transition"/>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-[16px] font-semibold text-black mb-2">
                  Phone Number
                </label>
                
                <div className="flex gap-2">
                  <div className="flex items-center px-4 h-[48px] border border-[#E8E2FF] rounded-[16px] bg-[#F9FAFB]">
                    
                    <span className="text-[15px] text-[#6B7280]">+91</span>
                  </div>
                  
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: value,
                      }));
                    }}
                    placeholder="Enter your Phone Number"
                    maxLength={10}
                    required
                    className="flex-1 h-[48px] px-4 border border-[#E8E2FF] rounded-[16px] focus:border-[#7C3AED] focus:outline-none text-[15px] text-black placeholder:text-[#9CA3AF] transition"/>
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-[16px] font-semibold text-black mb-2">
                  Create Password
                </label>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    className="w-full h-[48px] px-4 pr-12 border border-[#E8E2FF] rounded-[16px] focus:border-[#7C3AED] focus:outline-none text-[15px] text-black placeholder:text-[#9CA3AF] transition"/>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#7C3AED] transition"
                    aria-label="Toggle password visibility">
                    
                    {showPassword ? (<AiOutlineEyeInvisible size={20} />) : (<AiOutlineEye size={20} />)}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-[16px] font-semibold text-black mb-2">
                  Confirm Password
                </label>
                
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    required
                    className="w-full h-[48px] px-4 pr-12 border border-[#E8E2FF] rounded-[16px] focus:border-[#7C3AED] focus:outline-none text-[15px] text-black placeholder:text-[#9CA3AF] transition"/>
                  
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#7C3AED] transition"
                    aria-label="Toggle password visibility">
                    
                    {showConfirmPassword ? (<AiOutlineEyeInvisible size={20} />) : (<AiOutlineEye size={20} />)}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (<div className="text-red-600 text-sm font-medium">{error}</div>)}

              {/* Success Message */}
              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-[12px]">
                  <p className="text-green-600 text-sm font-medium">{success}</p>
                </div>
              )}

              {/* Terms and Conditions */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-[#D1D5DB] text-[#7C3AED] focus:ring-[#7C3AED] mt-1 flex-shrink-0"/>
                <span className="text-[13px] text-[#4B5563]">
                  I agree to the{" "}
                  
                  <a href="/" className="text-[#7C3AED] font-semibold hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  
                  <a href="/" className="text-[#7C3AED] font-semibold hover:underline">
                    Privacy Policy.
                  </a>
                  
                </span>
              </label>

              {/* Sign Up button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[50px] rounded-full bg-[#7C3AED] text-white font-semibold hover:bg-[#6D28D9] disabled:bg-[#9F7AEA] transition flex items-center justify-center">
                
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              
              <span className="text-[14px] text-[#6B7280]">or sign up with</span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => googleSignup()}
                className="w-full h-[58px] rounded-full border border-[#E5E7EB] bg-white text-[#374151] font-medium flex items-center justify-center gap-3 hover:bg-[#FAFAFA] transition">
                
                <FaGoogle size={18} className="text-red-500" />
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleAppleSignup}
                className="w-full h-[58px] rounded-full bg-black text-white font-medium flex items-center justify-center gap-3 hover:bg-[#111111] transition">
                
                <FaApple size={20} />
                <span>Continue with Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[14px] text-[#4B5563]">
              Already have a parent account?{" "}
              
              <button
                onClick={navigateToLogin}
                className="text-[#7C3AED] font-semibold hover:underline">
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
