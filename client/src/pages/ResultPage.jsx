import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import {
  Check,
  TrendingUp,
  BookOpen,
  ArrowRight,
} from "lucide-react";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const resultId = location.state?.resultId;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!token) {
          setError("User not authenticated.");
          return;
        }

        if (!resultId) {
          setError("Result ID is missing.");
          return;
        }

        const response = await fetch(
          `${API_URL}/results/${resultId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("Result Response:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load result"
          );
        }

        setResult(data.result);

      } catch (error) {
        console.error("Fetch Result Error:", error);

        setError(
          error.message || "Unable to load result"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading result...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-500">
            {error}
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full bg-[#7837e8] px-6 py-2 text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }
  return (
    <div className="min-h-screen bg-white py-14 px-4 font-sans">
      <div className="mx-auto w-full max-w-[645px]">

        {/* =====================================================
            HERO RESULT BANNER
        ====================================================== */}
        <section className="relative h-[265px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]">

          {/* Decorative circles */}
          <div className="absolute -left-12 -top-16 h-44 w-44 rounded-full bg-purple-500/30" />

          <div className="absolute bottom-[-75px] right-[-30px] h-52 w-52 rounded-full bg-purple-400/20" />

          <div className="absolute right-8 top-10 h-5 w-5 rounded-full bg-yellow-300 rotate-45" />
          <div className="absolute left-28 top-14 h-3 w-3 rounded-full bg-yellow-300" />
          <div className="absolute left-48 top-7 h-2 w-2 rounded-full bg-green-300" />
          <div className="absolute right-28 top-20 h-3 w-3 rounded-full bg-pink-300" />

          {/* =================================================
              CHARACTER / HERO IMAGE

              Put your actual illustration here:
              public/images/result-hero.png

              Replace the src if your image has another name.
          ================================================== */}
          <img
            src="/images/result-hero.png"
            alt="Student celebrating"
            className="absolute bottom-0 left-0 h-[235px] w-[290px] object-contain object-bottom"
          />

          {/* Star */}
          <div className="absolute left-[30px] top-[52px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white shadow-md">
            <span className="text-[28px] text-orange-400">★</span>
          </div>

          {/* Result information */}
          <div className="absolute right-[30px] top-[58px] text-right text-white">

            <div className="text-[58px] font-extrabold leading-none tracking-tight">
              {result.percentage}%
            </div>

            <h1 className="mt-3 text-[20px] font-extrabold">
              Amazing work,  {result.child?.childName || "Student"}!
            </h1>

            <div className="mt-4 flex justify-end gap-2">
              <span className="rounded-full bg-white/20 px-4 py-1 text-[11px] font-bold backdrop-blur-sm">
                {result.percentage >= 80
                  ? "Excellent"
                  : result.percentage >= 60
                  ? "Good"
                  : result.percentage >= 40
                  ? "Passed"
                  : "Needs Improvement"}
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            PERFORMANCE
        ====================================================== */}
        <section className="mt-5 rounded-[22px] border border-gray-200 bg-white p-6">

          <h2 className="text-[16px] font-extrabold text-gray-900">
            Performance
          </h2>

          {/* Statistics */}
          <div className="mt-5 grid grid-cols-4 gap-3">

            <PerformanceCard
              title="Score"
              value={`${result.score}`}
            />

            <PerformanceCard
              title="Percentage"
              value={`${result.percentage}%`}
            />

            <PerformanceCard
              title="Attempted"
              value={`${result.attemptedQuestions}`}
            />

            <PerformanceCard
              title="Total"
              value={`${result.totalQuestions}`}
            />
          </div>

          {/* Strengths / Needs Practice */}
          <div className="mt-5 grid grid-cols-2 gap-4">

            {/* Strengths */}
            <div className="rounded-[18px] bg-[#DDF8EC] p-5">

              <h3 className="text-[14px] font-extrabold text-[#00A86B]">
                Strengths
              </h3>

              <div className="mt-3 space-y-2">

                <SkillItem text="Fractions" />

                <SkillItem text="Logical thinking" />

                <SkillItem text="Creativity" />

              </div>
            </div>

            {/* Needs Practice */}
            <div className="rounded-[18px] bg-[#FFF6E3] p-5">

              <h3 className="text-[14px] font-extrabold text-[#F59E0B]">
                Needs practice
              </h3>

              <div className="mt-3 space-y-2">

                <PracticeItem text="Geometry" />

                <PracticeItem text="Time management" />

              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            YOUR NEXT STEP
        ====================================================== */}
        <section className="mt-5 rounded-[22px] border border-gray-200 bg-white p-6">

          <h2 className="text-[16px] font-extrabold text-gray-900">
            Your next step
          </h2>

          <div className="mt-5 space-y-3">

            <NextStep
              type="YOUR NEXT STEP"
              title="Geometry Practice"
              time="15 mins"
              button="Start now"
            />

            <NextStep
              type="TEST"
              title="Mental Maths Sprint"
              time="10 mins"
              button="View Test"
            />

            <NextStep
              type="TEST"
              title="Advanced Math for Young Thinkers"
              time="4 weeks"
              button="View Test"
            />

          </div>
        </section>

        {/* =====================================================
            BOTTOM BUTTONS
        ====================================================== */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          <button
            className="
              h-[46px]
              rounded-full
              border
              border-gray-200
              bg-white
              text-[13px]
              font-semibold
              text-gray-800
              transition
              hover:bg-gray-50
            "
          >
            View portfolio
          </button>

          <button
            className="
              flex
              h-[46px]
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#7C3AED]
              text-[13px]
              font-bold
              text-white
              transition
              hover:bg-[#6D28D9]
            "
          >
            Back to exams
            <ArrowRight size={16} />
          </button>

        </div>

      </div>
    </div>
  );
}


/* =========================================================
   PERFORMANCE CARD
========================================================= */

function PerformanceCard({ title, value }) {
  return (
    <div className="rounded-[16px] bg-[#F7F7FA] px-4 py-5">

      <p className="text-[11px] font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-[20px] font-extrabold leading-none text-gray-900">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   STRENGTH ITEM
========================================================= */

function SkillItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-gray-700">

      <Check
        size={14}
        strokeWidth={2.5}
        className="text-[#00A86B]"
      />

      <span>{text}</span>

    </div>
  );
}


/* =========================================================
   PRACTICE ITEM
========================================================= */

function PracticeItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-gray-700">

      <TrendingUp
        size={14}
        strokeWidth={2}
        className="text-[#F59E0B]"
      />

      <span>{text}</span>

    </div>
  );
}


/* =========================================================
   NEXT STEP
========================================================= */

function NextStep({
  type,
  title,
  time,
  button,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-[18px]
        bg-[#F7F7FA]
        px-5
        py-4
      "
    >

      <div className="flex items-center gap-4">

        {/* Icon */}
        <div
          className="
            flex
            h-[42px]
            w-[42px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#F1EAFF]
          "
        >
          <BookOpen
            size={17}
            strokeWidth={2}
            className="text-[#7C3AED]"
          />
        </div>

        {/* Text */}
        <div>

          <p className="text-[10px] font-medium uppercase text-gray-400">
            {type}
          </p>

          <h3 className="mt-0.5 text-[13px] font-extrabold text-gray-900">
            {title}
          </h3>

          <p className="mt-0.5 text-[10px] text-gray-500">
            {time}
          </p>

        </div>
      </div>

      {/* Button */}
      <button
        className="
          rounded-full
          border
          border-gray-200
          bg-white
          px-4
          py-2
          text-[11px]
          font-semibold
          text-gray-800
          transition
          hover:bg-gray-100
        "
      >
        {button}
      </button>

    </div>
  );
}

export default ResultPage;