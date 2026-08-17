import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FiSearch, FiMapPin, FiUser, FiAward } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import logo from "../assets/icons/Vector.svg";
import parentIllustration from "../assets/images/login page.png";
import bg from "../assets/images/login img-bg.png";
import API_URL from "../config/api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  /* =====================================================
     CHECK EXISTING LOGIN
  ===================================================== */

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (token) {
      redirectAfterLogin(token);
    }
  },);

  /* =====================================================
     REDIRECT AFTER LOGIN
  ===================================================== */

  const redirectAfterLogin = async (
    token,
    isNewGoogleUser = false
  ) => {
    try {
      /*
        If this is a newly created Google account,
        directly send the user to Welcome page.

        They have not created a child yet.
      */

      if (isNewGoogleUser) {
        navigate("/Welcome");
        return;
      }

      /*
        Get all children belonging to logged-in parent.
      */

      const response = await fetch(
        `${API_URL}/child/my-children`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("My Children:", data.children);

      if (!response.ok) {
        console.error(
          "Get Children Error:",
          data
        );

        setError(
          data.message ||
            "Unable to load child profile."
        );

        return;
      }

      /*
        Determine where the user should go.
      */

      if (
        data.success &&
        data.children &&
        data.children.length > 0
      ) {
        /*
          Existing parent has at least one child.

          Store the first child's ID so that
          dashboard and other pages can use it.
        */

        const child = data.children[0];

        const storage = rememberMe
          ? localStorage
          : sessionStorage;

        storage.setItem(
          "childId",
          child._id
        );

        /*
          Remove old childId from the other storage.
          This prevents stale child IDs.
        */

        if (rememberMe) {
          sessionStorage.removeItem("childId");
        } else {
          localStorage.removeItem("childId");
        }

        console.log(
          "Existing child found:",
          child._id
        );

        /*
          Existing user + existing child
          → Dashboard
        */

        navigate("/dashboard");
      } else {
        /*
          User exists but has no child.

          → Welcome page
          → Set Up Child Profile
        */

        navigate("/Welcome");
      }
    } catch (error) {
      console.error(
        "Redirect After Login Error:",
        error
      );

      setError(
        "Unable to load child profile."
      );
    }
  };

  /* =====================================================
     NORMAL EMAIL/PASSWORD LOGIN
  ===================================================== */

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /*
      Validate email
    */

    if (!EMAIL_REGEX.test(email.trim())) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    /*
      Validate password
    */

    if (!password.trim()) {
      setError(
        "Password is required."
      );
      return;
    }

    setIsLoading(true);

    try {
      /*
        Login API
      */

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email
              .toLowerCase()
              .trim(),

            password,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Login Response:",
        data
      );

      /*
        Login failed
      */

      if (!response.ok) {
        setError(
          data.message ||
            "Login Failed"
        );

        return;
      }

      /*
        =================================================
        SAVE JWT
        =================================================
      */

      if (rememberMe) {
        /*
          Remember Me checked

          JWT survives browser restart.
        */

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        /*
          Remove session storage
        */

        sessionStorage.removeItem(
          "token"
        );

        sessionStorage.removeItem(
          "user"
        );
      } else {
        /*
          Remember Me not checked

          JWT exists only for current session.
        */

        sessionStorage.setItem(
          "token",
          data.token
        );

        sessionStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        /*
          Remove local storage
        */

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );
      }

      setSuccess(
        "Login Successful"
      );

      /*
        =================================================
        CHECK CHILDREN
        =================================================

        This is the important part.

        Existing user with child
        → Dashboard

        Existing user without child
        → Welcome
      */

      await redirectAfterLogin(
        data.token,
        false
      );
    } catch (err) {
      console.error(
        "Login Error:",
        err
      );

      setError(
        err.message ||
          "Unable to connect to server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* =====================================================
     GOOGLE LOGIN
  ===================================================== */

  const handleGoogleLogin = () => {
    setError("");
    setSuccess("");

    if (!window.google) {
      setError(
        "Google authentication is not available."
      );

      return;
    }

    /*
      Initialize Google Identity Services
    */

    window.google.accounts.id.initialize({
      client_id:
        process.env.REACT_APP_GOOGLE_CLIENT_ID,

      callback:
        handleGoogleCredential,
    });

    /*
      Open Google login
    */

    window.google.accounts.id.prompt();
  };

  /* =====================================================
     GOOGLE CREDENTIAL CALLBACK
  ===================================================== */

  const handleGoogleCredential = async (
    response
  ) => {
    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      /*
        Make sure Google returned credential
      */

      if (!response?.credential) {
        setError(
          "Google authentication failed."
        );

        return;
      }

      console.log(
        "Google credential received"
      );

      /*
        =================================================
        SEND GOOGLE ID TOKEN TO BACKEND
        =================================================
      */

      const backendResponse =
        await fetch(
          `${API_URL}/auth/google`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              credential:
                response.credential,
            }),
          }
        );

      const data =
        await backendResponse.json();

      console.log(
        "Google Backend Response:",
        data
      );

      /*
        Google authentication failed
      */

      if (!backendResponse.ok) {
        setError(
          data.message ||
            "Google Login Failed"
        );

        return;
      }

      /*
        =================================================
        SAVE SKILLSPHERE JWT
        =================================================
      */

      if (rememberMe) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        sessionStorage.removeItem(
          "token"
        );

        sessionStorage.removeItem(
          "user"
        );
      } else {
        sessionStorage.setItem(
          "token",
          data.token
        );

        sessionStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );
      }

      /*
        =================================================
        SUCCESS MESSAGE
        =================================================
      */

      setSuccess(
        data.isNewUser
          ? "Google Signup Successful"
          : "Google Login Successful"
      );

      /*
        =================================================
        NAVIGATION
        =================================================

        New Google account
        → Welcome

        Existing Google account
        → Check children

        Existing Google account + child
        → Dashboard

        Existing Google account + no child
        → Welcome
      */

      await redirectAfterLogin(
        data.token,
        data.isNewUser
      );
    } catch (error) {
      console.error(
        "Google Login Error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* =====================================================
     APPLE LOGIN
  ===================================================== */

  const handleAppleLogin = () => {
    console.log(
      "Apple login clicked"
    );
  };

  /* =====================================================
     SIGNUP
  ===================================================== */

  const navigateToSignup = () => {
    navigate("/Signup");
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-white flex">

      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 py-16">

        <div className="mb-10 flex">

          <img
            src={logo}
            alt="SkillSphere"
            className="w-[32px] h-[32px]"
          />

          <p className="pl-3 font-medium text-[24px] text-[#7C3AED]">
            SkillSphere
          </p>

        </div>

        <p className="text-[#7C3AED] font-semibold text-[16px] mb-4">
          Welcome Back!
        </p>

        <h1 className="text-[48px] font-bold leading-[1.1] text-black max-w-[650px]">

          Continue Your{" "}

          <span className="text-[#7C3AED]">
            Child's Growth
          </span>{" "}

          Journey

        </h1>

        <p className="mt-6 text-[20px] leading-8 text-[#6B7280] max-w-[650px]">

          Sign in to discover new activities,
          manage certificates, track learning
          progress, and build your child's Skill
          Portfolio—all in one secure place.

        </p>

        <div className="mt-8">

          <h5 className="text-[28px] font-bold text-black">
            What You Can Do
          </h5>

          <div className="mt-6 space-y-5">

            {/* Discover Activities */}

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#F4EEFF] shadow-sm flex items-center justify-center text-[#7C3AED]">

                <FiSearch size={22} />

              </div>

              <div>

                <h3 className="font-semibold text-[16px] text-black">
                  Discover Activities
                </h3>

                <p className="text-[14px] text-[#6B7280]">

                  Explore verified courses and
                  extracurricular activities tailored
                  to your child's interests.

                </p>

              </div>

            </div>

            {/* Find Trusted Providers */}

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#F4EEFF] shadow-sm flex items-center justify-center text-[#7C3AED]">

                <FiMapPin size={22} />

              </div>

              <div>

                <h3 className="font-semibold text-[16px] text-black">
                  Find Trusted Providers
                </h3>

                <p className="text-[14px] text-[#6B7280]">

                  Browse nearby institutes and
                  compare programs with confidence.

                </p>

              </div>

            </div>

            {/* Student Profile */}

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#F4EEFF] shadow-sm flex items-center justify-center text-[#7C3AED]">

                <FiUser size={22} />

              </div>

              <div>

                <h3 className="font-semibold text-[16px] text-black">
                  Student Profile
                </h3>

                <p className="text-[14px] text-[#6B7280]">

                  View certificates, milestones, and
                  learning progress in one organized
                  dashboard.

                </p>

              </div>

            </div>

            {/* Skill Portfolio */}

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#F4EEFF] shadow-sm flex items-center justify-center text-[#7C3AED]">

                <FiAward size={22} />

              </div>

              <div>

                <h3 className="font-semibold text-[16px] text-black">
                  Build a Skill Portfolio
                </h3>

                <p className="text-[14px] text-[#6B7280]">

                  Create a lifelong portfolio that
                  showcases every skill, activity,
                  and achievement.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Illustration */}

        <div className="relative w-[540px] h-[290px] mt-10">

          <img
            src={bg}
            alt=""
            className="w-full max-w-[590px] h-[300px] object-contain"
          />

          <img
            src={parentIllustration}
            alt="Parent and child"
            className="absolute top-1 left-1 w-full max-w-[530px] h-[290px] object-contain"
          />

        </div>

      </div>

      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="w-full lg:w-1/2 flex items-start justify-center px-4 sm:px-6 lg:px-12 py-10 lg:py-16">

        <div className="w-full max-w-[650px] mt-16">

          <div className="w-full rounded-[24px] border border-[#E8E2FF] p-6 sm:p-8 lg:p-10">

            <h3 className="text-[38px] lg:text-[40px] font-bold text-black">
              Login to your account
            </h3>

            {/* =================================================
                EMAIL LOGIN
            ================================================= */}

            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="block text-[16px] font-semibold text-black mb-2"
                >
                  Parent Email
                </label>

                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email"
                  required
                  className="w-full h-[48px] px-4 border border-[#E8E2FF] rounded-[16px] focus:border-[#7C3AED] text-[15px] text-black placeholder:text-[#9CA3AF]"
                />

              </div>

              {/* Password */}

              <div>

                <label
                  htmlFor="password"
                  className="block text-[16px] font-semibold text-black mb-2"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter your Password"
                    required
                    className="w-full h-[48px] px-4 pr-12 border border-[#E8E2FF] rounded-[16px] outline-none focus:border-[#7C3AED] text-[15px] text-black placeholder:text-[#9CA3AF]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                    aria-label="Toggle password visibility"
                  >

                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        size={20}
                      />
                    ) : (
                      <AiOutlineEye
                        size={20}
                      />
                    )}

                  </button>

                </div>

              </div>

              {/* Error */}

              {error && (
                <p className="text-red-600 text-sm font-medium">
                  {error}
                </p>
              )}

              {/* Success */}

              {success && (
                <p className="text-green-600 text-sm font-medium">
                  {success}
                </p>
              )}

              {/* Remember / Forgot */}

              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 rounded border-[#D1D5DB] text-[#7C3AED] focus:ring-[#7C3AED]"
                  />

                  <span className="text-[14px] text-[#374151]">
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/forgot-password"
                    )
                  }
                  className="text-[14px] text-[#3B82F6] hover:underline"
                >
                  Forgot password?
                </button>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[50px] rounded-full bg-[#7C3AED] text-white font-semibold hover:bg-[#6D28D9] transition flex items-center justify-center disabled:opacity-50"
              >

                {isLoading
                  ? "Logging in..."
                  : "Log In"}

              </button>

            </form>

            {/* =================================================
                SOCIAL LOGIN DIVIDER
            ================================================= */}

            <div className="my-6 flex items-center gap-4">

              <div className="flex-1 h-px bg-[#E5E7EB]" />

              <span className="text-[14px] text-[#6B7280]">
                or continue with
              </span>

              <div className="flex-1 h-px bg-[#E5E7EB]" />

            </div>

            {/* =================================================
                SOCIAL LOGIN BUTTONS
            ================================================= */}

            <div className="space-y-3">

              {/* GOOGLE */}

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full h-[58px] rounded-full border border-[#E5E7EB] bg-white text-[#374151] font-medium flex items-center justify-center gap-3 hover:bg-[#FAFAFA] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                <FaGoogle
                  size={18}
                  className="text-red-500"
                />

                <span>

                  {isLoading
                    ? "Connecting to Google..."
                    : "Continue with Google"}

                </span>

              </button>

              {/* APPLE */}

              <button
                type="button"
                onClick={handleAppleLogin}
                className="w-full h-[58px] rounded-full bg-black text-white font-medium flex items-center justify-center gap-3 hover:bg-[#111111]"
              >

                <FaApple size={20} />

                <span>
                  Continue with Apple
                </span>

              </button>

            </div>

            {/* =================================================
                SIGNUP
            ================================================= */}

            <p className="mt-8 text-center text-[14px] text-[#4B5563]">

              Don't you have an account?{" "}

              <button
                type="button"
                onClick={navigateToSignup}
                className="text-[#7C3AED] font-semibold hover:underline"
              >
                Sign up
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;