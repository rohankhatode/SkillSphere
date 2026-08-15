import React, { useEffect, useState } from "react";
import API_URL from "../config/api";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Play,
  Clock3,
  FileText,
  Download,
  Award,
  Timer,
} from "lucide-react";

function UpcomingExams() {
  const navigate = useNavigate();

  const [upcomingExams, setUpcomingExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);

  const [resultSummary, setResultSummary] = useState({
    totalExams: 0,
    completed: 0,
    upcoming: 0,
    averageScore: 0,
    highestScore: 0,
    certificatesEarned: 0,
  });

  const [recentResult, setRecentResult] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH UPCOMING EXAMS + RESULTS
  ===================================================== */

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError("");

        const childId = localStorage.getItem("childId");

        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!childId) {
          throw new Error("Child not found.");
        }

        if (!token) {
          throw new Error("User not authenticated.");
        }

        /* =================================================
           1. FETCH UPCOMING EXAMS
        ================================================= */

        const upcomingResponse = await fetch(
          `${API_URL}/exams/upcoming/${childId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const upcomingData = await upcomingResponse.json();

        console.log("Upcoming Exams:", upcomingData);

        if (!upcomingResponse.ok) {
          throw new Error(
            upcomingData.message ||
              "Unable to load upcoming exams"
          );
        }

        const exams = upcomingData.exams || [];

        setUpcomingExams(exams);

        /* =================================================
           2. FETCH RESULTS
        ================================================= */

        const resultsResponse = await fetch(
          `${API_URL}/results/child/${childId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const resultsData = await resultsResponse.json();

        console.log("Results Response:", resultsData);

        if (!resultsResponse.ok) {
          throw new Error(
            resultsData.message ||
              "Unable to load results"
          );
        }

        const results = resultsData.results || [];

        /* =================================================
           3. FILTER COMPLETED EXAMS
        ================================================= */

        const completed = results.filter(
          (result) =>
            result.status === "completed" ||
            result.status === "submitted"
        );

        setCompletedExams(completed);

        /* =================================================
           4. CALCULATE SCORE STATISTICS
        ================================================= */

        const scores = completed
          .map((result) => {
            if (result.score !== undefined) {
              return Number(result.score);
            }

            if (result.percentage !== undefined) {
              return Number(result.percentage);
            }

            return NaN;
          })
          .filter(
            (score) =>
              !Number.isNaN(score)
          );

        const averageScore =
          scores.length > 0
            ? Math.round(
                scores.reduce(
                  (sum, score) =>
                    sum + score,
                  0
                ) / scores.length
              )
            : 0;

        const highestScore =
          scores.length > 0
            ? Math.max(...scores)
            : 0;

        /* =================================================
           5. SUMMARY
        ================================================= */

        setResultSummary({
          totalExams:
            completed.length +
            exams.length,

          completed:
            completed.length,

          upcoming:
            exams.length,

          averageScore:
            averageScore,

          highestScore:
            highestScore,

          certificatesEarned:
            resultsData.certificatesEarned ||
            resultsData.summary?.certificatesEarned ||
            0,
        });

        /* =================================================
           6. RECENT RESULT
        ================================================= */

        if (completed.length > 0) {
          const sortedResults = [...completed].sort(
            (a, b) => {
              const dateA = new Date(
                a.completedAt ||
                  a.updatedAt ||
                  a.createdAt ||
                  0
              );

              const dateB = new Date(
                b.completedAt ||
                  b.updatedAt ||
                  b.createdAt ||
                  0
              );

              return dateB - dateA;
            }
          );

          setRecentResult(
            sortedResults[0]
          );
        } else {
          setRecentResult(null);
        }
      } catch (err) {
        console.error(
          "Upcoming Exams Page Error:",
          err
        );

        setError(
          err.message ||
            "Unable to load page data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  /* =====================================================
     START EXAM
  ===================================================== */

  const handleStartExam = async (exam) => {
    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const childId =
        localStorage.getItem("childId");

      if (!token) {
        throw new Error(
          "User not authenticated."
        );
      }

      if (!childId) {
        throw new Error(
          "Child not found."
        );
      }

      if (!exam?._id) {
        throw new Error(
          "Exam ID is missing."
        );
      }

      /* ===============================================
         CREATE RESULT / ATTEMPT
      =============================================== */

      const response = await fetch(
        `${API_URL}/results`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            examId: exam._id,
            childId: childId,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Create Result Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to start exam"
        );
      }

      if (!data.result?._id) {
        throw new Error(
          "Result ID was not returned."
        );
      }

      /* ===============================================
         GO TO EXAM PAGE
      =============================================== */

      navigate("/exam/start", {
        state: {
          examId: exam._id,
          childId: childId,
          resultId: data.result._id,
        },
      });
    } catch (error) {
      console.error(
        "Start Exam Error:",
        error
      );

      alert(error.message);
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p className="text-[14px] text-gray-500">
          Loading exams...
        </p>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-[14px] text-red-500 mb-4">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="px-5 py-2 bg-[#7C3AED] text-white rounded-full text-[14px]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[#111827]">
          Upcoming Exams
        </h1>
      </div>

      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-5">

        <div className="rounded-2xl bg-[#F0E8FF] px-5 py-5">
          <p className="text-[12px] text-gray-500">
            Upcoming Exams
          </p>

          <h2 className="text-[18px] font-bold mt-2">
            {resultSummary.upcoming}
          </h2>
        </div>

        <div className="rounded-2xl bg-[#DDF5E8] px-5 py-5">
          <p className="text-[13px] text-gray-500">
            Completed
          </p>

          <h2 className="text-[20px] font-bold mt-2">
            {resultSummary.completed}
          </h2>
        </div>

        <div className="rounded-2xl bg-[#E5EEFF] px-5 py-5">
          <p className="text-[13px] text-gray-500">
            Average Score
          </p>

          <h2 className="text-[20px] font-bold mt-2">
            {resultSummary.averageScore}%
          </h2>
        </div>

        <div className="rounded-2xl bg-[#FFF2D7] px-5 py-5">
          <p className="text-[13px] text-gray-500">
            Next Exam
          </p>

          <h2 className="text-[18px] font-bold mt-2">
            {upcomingExams.length > 0
              ? upcomingExams[0].title
              : "No Upcoming Exam"}
          </h2>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-5">

        {/* LEFT COLUMN */}
        <div>

          {/* UPCOMING EXAM CARDS */}
          <div className="space-y-3">

            {upcomingExams.length === 0 ? (
              <div className="bg-white border border-[#E8E8EE] rounded-2xl p-6 text-center">
                <p className="text-[14px] text-gray-500">
                  No upcoming exams available.
                </p>
              </div>
            ) : (
              upcomingExams.map(
                (exam, index) => (

                  <div
                    key={
                      exam._id || index
                    }
                    className="bg-white border border-[#E8E8EE] rounded-2xl p-4"
                  >

                    <div className="flex items-center gap-4">

                      {/* DATE BOX */}
                      <div className="w-[80px] h-[145px] shrink-0 bg-[#F2EAFE] rounded-[28px] flex flex-col items-center justify-center">

                        <span className="text-[24px] font-bold text-[#7C3AED]">
                          {exam.day}
                        </span>

                        <span className="text-[12px] font-semibold text-[#7C3AED]">
                          {exam.month}
                        </span>

                      </div>

                      {/* EXAM CONTENT */}
                      <div className="flex-1">

                        <div className="flex items-center justify-between mb-4">

                          <h3 className="text-[16px] font-bold text-[#111827]">
                            {exam.title}
                          </h3>

                          <span className="bg-[#FFF4D7] text-[#F59E0B] text-[12px] font-medium px-3 py-1 rounded-full">
                            {exam.starts}
                          </span>

                        </div>

                        {/* DETAILS */}
                        <div className="grid grid-cols-4 gap-3">

                          <div className="bg-[#F8F8FB] rounded-full px-4 py-3">
                            <p className="text-[12px] text-gray-400 mb-1">
                              Date
                            </p>

                            <p className="text-[16px] font-semibold">
                              {exam.date}
                            </p>
                          </div>

                          <div className="bg-[#F8F8FB] rounded-full px-4 py-3">
                            <p className="text-[12px] text-gray-400 mb-1">
                              Time
                            </p>

                            <p className="text-[16px] font-semibold">
                              {exam.time}
                            </p>
                          </div>

                          <div className="bg-[#F8F8FB] rounded-full px-4 py-3">
                            <p className="text-[12px] text-gray-400 mb-1">
                              Duration
                            </p>

                            <p className="text-[16px] font-semibold">
                              {exam.duration}
                            </p>
                          </div>

                          <div className="bg-[#F8F8FB] rounded-full px-4 py-3">
                            <p className="text-[12px] text-gray-400 mb-1">
                              Questions
                            </p>

                            <p className="text-[16px] font-semibold">
                              {exam.questions}
                            </p>
                          </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex items-center gap-2 mt-3">

                          {exam.reminder && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#F8F8FB] border border-[#E5E5EA] rounded-full text-[12px] font-medium shadow-sm hover:bg-gray-100">
                              <Bell size={16} />
                              Set Reminder
                            </button>
                          )}

                          {exam.startExam && (
                            <button
                              onClick={() =>
                                handleStartExam(
                                  exam
                                )
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-full text-[12px] font-medium hover:bg-[#6D28D9]"
                            >
                              <Play size={16} />
                              Start Exam
                            </button>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            )}

          </div>

          {/* BEFORE YOU BEGIN */}
          <div className="bg-white border border-[#E8E8EE] rounded-2xl p-5 mt-5">

            <h2 className="text-[16px] font-bold mb-4">
              Before You Begin
            </h2>

            <ul className="space-y-2 text-[14px] text-gray-500">

              <li className="flex gap-2">
                <span className="text-[#7C3AED]">•</span>
                Complete the exam in one sitting.
              </li>

              <li className="flex gap-2">
                <span className="text-[#7C3AED]">•</span>
                Ensure a stable internet connection.
              </li>

              <li className="flex gap-2">
                <span className="text-[#7C3AED]">•</span>
                Do not refresh or close the browser.
              </li>

              <li className="flex gap-2">
                <span className="text-[#7C3AED]">•</span>
                Each question has one correct answer unless stated otherwise.
              </li>

              <li className="flex gap-2">
                <span className="text-[#7C3AED]">•</span>
                Your score will be available after submission or evaluation.
              </li>

            </ul>

            <button className="w-full mt-4 border bg-[#F8F8FB] border-[#E5E5EA] rounded-[24px] py-3 text-[14px] shadow font-medium hover:bg-gray-100">
              View Full Guidelines
            </button>

          </div>

          {/* COMPLETED EXAMS */}
          <div className="bg-white border border-[#E8E8EE] rounded-2xl p-5 mt-5">

            <h2 className="text-[16px] font-bold mb-4">
              Completed Exams
            </h2>

            <div>

              {completedExams.length === 0 ? (
                <p className="text-[14px] text-gray-400 py-4">
                  No completed exams yet.
                </p>
              ) : (
                completedExams.map(
                  (exam, index) => {

                    const examName =
                      exam.examTitle ||
                      exam.title ||
                      exam.exam?.title ||
                      "Assessment";

                    const examScore =
                      exam.score ??
                      exam.percentage ??
                      0;

                    return (
                      <div
                        key={
                          exam._id ||
                          index
                        }
                        className={`flex items-center justify-between py-4 ${
                          index !==
                          completedExams.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >

                        <div>

                          <p className="text-[14px] font-semibold">
                            {examName}
                          </p>

                          <span className="inline-block mt-1 bg-[#DDF5E8] text-[#16A34A] px-2 py-1 rounded-full text-[12px]">
                            Completed
                          </span>

                        </div>

                        <div className="flex items-center gap-5">

                          <div className="text-right">

                            <p className="text-[12px] text-gray-400">
                              Score
                            </p>

                            <p className="font-semibold text-[14px]">
                              {examScore}%
                            </p>

                          </div>

                          <button
                            onClick={() =>
                              navigate(
                                `/results/${exam._id}`
                              )
                            }
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-[14px]"
                          >
                            <FileText size={14} />

                            View Result
                          </button>

                        </div>

                      </div>
                    );
                  }
                )
              )}

            </div>

          </div>

          {/* RESULTS SUMMARY */}
          <div className="bg-white border border-[#E8E8EE] rounded-2xl p-5 mt-5">

            <h2 className="text-[16px] font-bold mb-4">
              Results & Performance Summary
            </h2>

            <div className="grid grid-cols-3 gap-3">

              <SummaryCard
                title="Total Exams"
                value={
                  resultSummary.totalExams
                }
                bg="#F0E8FF"
              />

              <SummaryCard
                title="Completed"
                value={
                  resultSummary.completed
                }
                bg="#DDF5E8"
              />

              <SummaryCard
                title="Upcoming"
                value={
                  resultSummary.upcoming
                }
                bg="#E5EEFF"
              />

              <SummaryCard
                title="Average Score"
                value={`${resultSummary.averageScore}%`}
                bg="#FFF2D7"
              />

              <SummaryCard
                title="Highest Score"
                value={`${resultSummary.highestScore}%`}
                bg="#FCE7EF"
              />

              <SummaryCard
                title="Certificates Earned"
                value={
                  resultSummary.certificatesEarned
                }
                bg="#DDF2F2"
              />

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">

          {/* NEXT ASSESSMENT */}
          <div className="bg-white border border-[#E8E8EE] rounded-2xl p-5">

            <h2 className="text-[15px] font-bold mb-4">
              Next Assessment
            </h2>

            <div className="bg-[#F0E8FF] rounded-2xl p-4">

              <div className="flex items-center gap-2 text-[#7C3AED] text-[16px] font-semibold">
                <Timer size={16} />

                {upcomingExams.length > 0
                  ? upcomingExams[0].title
                  : "No Upcoming Assessment"}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">

                <div className="bg-white rounded-2xl py-3 text-center">

                  <p className="text-[18px] font-bold">
                    {upcomingExams.length > 0
                      ? upcomingExams[0].daysLeft ??
                        "-"
                      : "-"}
                  </p>

                  <p className="text-[12px] text-gray-400">
                    Days
                  </p>

                </div>

                <div className="bg-white rounded-2xl py-3 text-center">

                  <p className="text-[18px] font-bold">
                    {upcomingExams.length > 0
                      ? upcomingExams[0].hoursLeft ??
                        "-"
                      : "-"}
                  </p>

                  <p className="text-[12px] text-gray-400">
                    Hours
                  </p>

                </div>

              </div>
            </div>

            <button className="w-full mt-3 border border-gray-200 rounded-full py-3 text-[14px] font-medium flex items-center justify-center gap-2">
              <Bell size={16} />
              Set Reminder
            </button>

          </div>

          {/* RECENT RESULT */}
          <div className="bg-white border border-[#E8E8EE] rounded-2xl p-5">

            <h2 className="text-[16px] font-bold mb-5">
              Recent Result
            </h2>

            {recentResult ? (
              <>
                <p className="text-[14px] font-semibold">

                  {recentResult.examTitle ||
                    recentResult.title ||
                    recentResult.exam?.title ||
                    "Assessment"}

                </p>

                <div className="flex justify-between items-end mt-4">

                  <div>
                    <p className="text-[12px] text-gray-400">
                      Score
                    </p>
                  </div>

                  <p className="text-[24px] font-bold text-[#7C3AED]">

                    {recentResult.score ??
                      recentResult.percentage ??
                      0}
                    %

                  </p>

                </div>

                {/* PROGRESS */}
                <div className="h-2 bg-[#E9DDFD] rounded-full mt-2">

                  <div
                    className="h-full bg-[#7C3AED] rounded-full"
                    style={{
                      width: `${Math.min(
                        recentResult.score ??
                          recentResult.percentage ??
                          0,
                        100
                      )}%`,
                    }}
                  />

                </div>

                <div className="flex items-center gap-2 mt-3 text-[12px] text-gray-400">

                  <Award
                    size={14}
                    className="text-[#F59E0B]"
                  />

                  Performance

                  <span className="bg-[#DDF5E8] text-[#16A34A] px-2 py-1 rounded-full">

                    {(recentResult.score ??
                      recentResult.percentage ??
                      0) >= 90
                      ? "Excellent"
                      : (recentResult.score ??
                          recentResult.percentage ??
                          0) >= 75
                      ? "Good"
                      : "Needs Improvement"}

                  </span>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/results/${recentResult._id}`
                    )
                  }
                  className="w-full mt-4 bg-[#F3EEFF] rounded-full py-3 text-[14px] font-medium"
                >
                  View Result
                </button>
              </>
            ) : (
              <p className="text-[14px] text-gray-400">
                No completed results yet.
              </p>
            )}

          </div>

          {/* RECOMMENDED PRACTICE */}
          <div className="bg-white border border-[#E8E8EE] rounded-2xl p-5">

            <h2 className="text-[16px] font-bold">
              Recommended Practice
            </h2>

            <p className="text-[12px] text-gray-400 mt-2">
              Based on your previous scores
            </p>

            <div className="space-y-2 mt-4">

              {[
                "Algebra Basics",
                "Logical Thinking",
                "Mental Maths",
              ].map((item) => (

                <div
                  key={item}
                  className="bg-[#F8F8FB] rounded-full px-4 py-3 text-[14px] flex items-center gap-2"
                >
                  <span className="text-[#7C3AED]">
                    •
                  </span>

                  {item}
                </div>

              ))}

            </div>

            <button className="w-full mt-4 bg-[#7C3AED] text-white rounded-full py-3 text-[16px] font-semibold">
              Practice Now
            </button>

          </div>

          {/* EXAM READINESS */}
          <div className="bg-white border border-[#E8E8EE] rounded-2xl p-5">

            <h2 className="text-[16px] font-bold mb-5">
              Exam Readiness
            </h2>

            <div className="flex items-center justify-between text-[14px]">

              <div className="flex items-center gap-2">

                <Clock3
                  size={16}
                  className="text-[#7C3AED]"
                />

                Math Assessment

              </div>

              <span className="text-[#7C3AED] font-semibold">

                {resultSummary.averageScore}%

              </span>

            </div>

            <div className="h-2 bg-[#E9DDFD] rounded-full mt-3">

              <div
                className="h-full bg-[#7C3AED] rounded-full"
                style={{
                  width: `${Math.min(
                    resultSummary.averageScore,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
  title,
  value,
  bg,
}) {
  return (
    <div
      className="rounded-2xl px-4 py-5"
      style={{
        backgroundColor: bg,
      }}
    >

      <p className="text-[12px] text-gray-500">
        {title}
      </p>

      <p className="text-[18px] font-bold mt-2">
        {value}
      </p>

    </div>
  );
}

export default UpcomingExams;