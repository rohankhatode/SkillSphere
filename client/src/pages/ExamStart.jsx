import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../config/api";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Eraser,
  Flag,
  ListChecks,
  Save,
  Lightbulb,
} from "lucide-react";

function ExamStart() {
  const location = useLocation();
  const navigate = useNavigate();

  // --------------------------------------------------
  // EXAM SESSION DATA
  // --------------------------------------------------

  const {
    examId,
    childId,
    resultId,
  } = location.state || {};

  // --------------------------------------------------
  // QUESTIONS
  // --------------------------------------------------

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // CURRENT QUESTION
  // --------------------------------------------------

  const [currentQuestion, setCurrentQuestion] = useState(1);

  // Answers format:
  //
  // {
  //   "mongodb-question-id": optionIndex
  // }
  //
  // Example:
  //
  // {
  //   "6a7e128cb675cb7250549d20": 2
  // }
  //
  const [answers, setAnswers] = useState({});

  // --------------------------------------------------
  // MARKED QUESTIONS
  // --------------------------------------------------

  // We store question numbers here.
  //
  // Example:
  // [2, 5, 8]
  //
  const [markedQuestions, setMarkedQuestions] = useState([]);

  // --------------------------------------------------
  // TIMER
  // --------------------------------------------------

  const [timeLeft, setTimeLeft] = useState(0);
  const submitStartedRef = useRef(false);

  // ==================================================
  // FETCH QUESTIONS
  // ==================================================

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        // Get authentication token
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!token) {
          setError("User not authenticated.");
          return;
        }

        // Make sure exam ID exists
        if (!examId) {
          setError("Exam ID is missing.");
          return;
        }

        console.log("Fetching questions for exam:", examId);

        const response = await fetch(
          `${API_URL}/questions/exam/${examId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("Questions Response:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load questions"
          );
        }

        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Fetch Questions Error:", error);

        setError(
          error.message || "Unable to load questions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examId]);

  useEffect(() => {
    const fetchExistingAnswers = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!token || !resultId) {
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

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Unable to load saved answers"
          );
        }

        const savedAnswers = {};

        data.result?.answers?.forEach((answer) => {
          const questionId =
            answer.question?._id ||
            answer.question;

          savedAnswers[questionId] =
            answer.selectedAnswer;
        });

        setAnswers(savedAnswers);

      } catch (error) {
        console.error(
          "Fetch Existing Answers Error:",
          error
        );
      }
    };

    fetchExistingAnswers();
  }, [resultId]);

  useEffect(() => {
  if (!resultId) {
    return;
  }

  const fetchExamTime = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/results/${resultId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to load exam time"
        );
      }

      const startedAt =
        new Date(data.result.startedAt).getTime();

      const durationMinutes =
        data.result.exam?.duration || 45;

      const endTime =
        startedAt +
        durationMinutes * 60 * 1000;

      const remainingSeconds = Math.max(
        0,
        Math.floor(
          (endTime - Date.now()) / 1000
        )
      );

      setTimeLeft(remainingSeconds);

    } catch (error) {
      console.error(
        "Fetch Exam Time Error:",
        error
      );
    }
  };

  fetchExamTime();
}, [resultId]);

  // ==================================================
  // TIMER
  // ==================================================

  useEffect(() => {
    if (loading || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) =>
        previousTime > 0
          ? previousTime - 1
          : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, timeLeft]);

  // ==================================================
  // FORMAT TIMER
  // ==================================================

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

// ==================================================
// SUBMIT EXAM
// ==================================================

  const submitExam = useCallback(async (autoSubmit=false) => {
  try {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    if (!resultId) {
      alert("Exam attempt not found.");
      return;
    }

    if (!autoSubmit) {
      const confirmSubmit = window.confirm(
        "Are you sure you want to submit the exam?"
      );

      if (!confirmSubmit) {
        return;
      }
    }

    const response = await fetch(
      `${API_URL}/results/${resultId}/submit`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("Submit Exam Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Unable to submit exam");
    }

    const submittedResultId = data.result?.resultId;

    if (!submittedResultId) {
      throw new Error("Result ID was not returned after submission.");
    }

    console.log("Submitted Result ID:", submittedResultId);

    navigate(`/result/${submittedResultId}`);

      } catch (error) {
        console.error("Submit Exam Error:", error);

        alert(
          error.message || "Unable to submit exam"
        );
      }
    },[resultId, navigate]);

    useEffect(() => {
      if (
        !loading &&
        timeLeft === 0 &&
        resultId &&
        !submitStartedRef.current
      ) {
        submitStartedRef.current=true;
        submitExam(true);
      }
    }, [timeLeft, loading, resultId, submitExam]);

  // ==================================================
  // LOADING STATE
  // ==================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading questions...
        </p>
      </div>
    );
  }

  // ==================================================
  // ERROR STATE
  // ==================================================

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error}
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#7837e8] text-white px-6 py-2 rounded-full"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!examId || !childId || !resultId) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">
          Exam session information is missing.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#7837e8] text-white px-6 py-2 rounded-full"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

  // ==================================================
  // NO QUESTIONS
  // ==================================================

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            No questions available for this exam.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#7837e8] text-white px-6 py-2 rounded-full"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ==================================================
  // CURRENT QUESTION
  // ==================================================

  const current = questions[currentQuestion - 1];

  // ==================================================
  // ANSWER SELECTION
  // ==================================================

  const selectAnswer = async (answerIndex) => {
  try {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    if (!resultId) {
      alert("Exam attempt not found.");
      return;
    }

    const current = questions[currentQuestion - 1];

    if (!current) {
      return;
    }

    // Update UI immediately
    setAnswers((previous) => ({
      ...previous,
      [current._id]: answerIndex,
    }));

    // Save answer to backend
    const response = await fetch(
      `${API_URL}/results/${resultId}/answers`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: current._id,
          selectedAnswer: answerIndex,
        }),
      }
    );

    const data = await response.json();

    console.log("Save Answer Response:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to save answer"
      );
    }

  } catch (error) {
    console.error("Save Answer Error:", error);

    alert(
      error.message || "Unable to save answer"
    );
  }
};

  // ==================================================
  // QUESTION STATUS
  // ==================================================

  const answeredCount = Object.keys(answers).length;

  const markedCount = markedQuestions.length;

  const remainingCount =
    questions.length - answeredCount;

  const progressPercentage =
    questions.length > 0
      ? Math.round(
          (answeredCount / questions.length) * 100
        )
      : 0;

  // ==================================================
  // MARK QUESTION
  // ==================================================

  const toggleMark = () => {
    setMarkedQuestions((previousMarked) => {
      if (
        previousMarked.includes(currentQuestion)
      ) {
        return previousMarked.filter(
          (id) => id !== currentQuestion
        );
      }

      return [
        ...previousMarked,
        currentQuestion,
      ];
    });
  };

  // ==================================================
  // PREVIOUS QUESTION
  // ==================================================

  const goPrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(
        currentQuestion - 1
      );
    }
  };

  // ==================================================
  // NEXT QUESTION
  // ==================================================

  const goNext = () => {
    if (
      currentQuestion <
      questions.length
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    }
  };

  // ==================================================
  // CLEAR ANSWER
  // ==================================================

  const clearAnswer = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        return;
      }

      if (!resultId) {
        alert("Exam attempt not found.");
        return;
      }

      if (!current?._id) {
        return;
      }

      const response = await fetch(
        `${API_URL}/results/${resultId}/answers/${current._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to clear answer"
        );
      }

      setAnswers((previousAnswers) => {
        const updatedAnswers = {
          ...previousAnswers,
        };

        delete updatedAnswers[current._id];

        return updatedAnswers;
      });

    } catch (error) {
      console.error(
        "Clear Answer Error:",
        error
      );

      alert(
        error.message ||
        "Unable to clear answer"
      );
    }
  };

  // ==================================================
  // QUESTION STATUS COLOR
  // ==================================================

  const getQuestionStyle = (questionNumber) => {
    // Current question
    if (
      questionNumber === currentQuestion
    ) {
      return "bg-[#7837e8] text-white shadow-md";
    }

    // Get actual question
    const question =
      questions[questionNumber - 1];

    // Answered
    if (
      question &&
      answers[question._id] !== undefined
    ) {
      return "bg-[#d6f5e8] text-[#12965b]";
    }

    // Marked
    if (
      markedQuestions.includes(
        questionNumber
      )
    ) {
      return "bg-[#ffe1a8] text-[#a56600]";
    }

    // Not visited
    return "bg-[#f7f7fa] text-[#687080]";
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div className="min-h-screen bg-white text-[#171b2b] mb-10">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="h-[78px] border-b border-[#e7e7ec] bg-white px-9">

        <div className="flex h-full items-center">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#9a4cff] to-[#7132df] text-sm font-bold text-white">
              S
            </div>

            <div className="font-bold text-[14px]">
              SkillSphere
            </div>

          </div>

          {/* Divider */}

          <div className="mx-5 h-7 w-px bg-[#dedee5]" />

          {/* Assessment */}

          <div className="min-w-[125px]">

            <p className="text-[14px] font-bold">
              Math Assessment
            </p>

            <p className="text-[12px] text-[#777d8b]">
              Question {currentQuestion} of{" "}
              {questions.length}
            </p>

          </div>

          {/* Progress */}

          <div className="mx-5 flex flex-1 items-center gap-3">

            <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#e5d7fa]">

              <div
                className="h-full rounded-full bg-[#813bea]"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />

            </div>

            <span className="text-[12px] font-semibold text-[#555a68]">
              {progressPercentage}%
            </span>

          </div>

          {/* Timer */}

          <div className="mr-4 flex items-center gap-2 rounded-full bg-[#f6f5fa] px-4 py-2.5">

            <Clock3
              size={16}
              strokeWidth={2}
            />

            <span className="text-[14px] font-semibold">
              {formatTime()}
            </span>

          </div>

          {/* User */}

          <div className="flex items-center gap-3 rounded-full border border-[#e1e1e7] px-3 py-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0e7ff] text-[12px] font-bold text-[#7937e8]">
              AM
            </div>

            <div className="leading-tight">

              <p className="text-[12px] font-semibold">
                Aarav Mahatre
              </p>

              <p className="text-[12px] text-[#747986]">
                Grade 5 · Green Valley Public School · Age 10
              </p>

            </div>

            <span className="ml-2 text-[#626775]">
              ⌄
            </span>

          </div>

        </div>

      </header>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="grid grid-cols-[220px_minmax(600px,820px)_280px] gap-6 px-9 py-11">

        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <aside className="space-y-4">

          {/* Questions */}

          <div className="rounded-[20px] border border-[#e1e2e7] bg-white p-5">

            <div className="mb-4 flex items-center gap-2">

              <ListChecks
                size={16}
                className="text-[#7937e8]"
              />

              <h2 className="text-[14px] font-semibold">
                Questions
              </h2>

            </div>

            {/* Question Grid */}

            <div className="grid grid-cols-3 gap-2">

              {questions.map(
                (question, index) => {

                  const questionNumber =
                    index + 1;

                  return (
                    <button
                      key={question._id}
                      onClick={() =>
                        setCurrentQuestion(
                          questionNumber
                        )
                      }
                      className={`flex h-[55px] items-center justify-center rounded-full text-[14px] font-semibold transition hover:scale-[1.03] ${getQuestionStyle(
                        questionNumber
                      )}`}
                    >
                      {questionNumber}
                    </button>
                  );
                }
              )}

            </div>

            {/* Legend */}

            <div className="mt-5 space-y-3">

              <div className="flex items-center gap-2 text-[12px] text-[#7a7f8d]">

                <span className="h-3 w-3 rounded-full bg-[#7837e8]" />

                Current

              </div>

              <div className="flex items-center gap-2 text-[12px] text-[#7a7f8d]">

                <span className="h-3 w-3 rounded-full bg-[#8cddb8]" />

                Answered

              </div>

              <div className="flex items-center gap-2 text-[12px] text-[#7a7f8d]">

                <span className="h-3 w-3 rounded-full bg-[#f5c96c]" />

                Marked

              </div>

              <div className="flex items-center gap-2 text-[12px] text-[#7a7f8d]">

                <span className="h-3 w-3 rounded-full bg-[#f2f2f6]" />

                Not visited

              </div>

            </div>

          </div>

          {/* Progress Summary */}

          <div className="rounded-[20px] border border-[#e1e2e7] bg-white p-5">

            <h2 className="mb-4 text-[14px] font-bold">
              Progress summary
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between text-[14px]">

                <span className="text-[#777d8b]">
                  Answered
                </span>

                <span className="font-semibold text-[#15995e]">
                  {answeredCount}
                </span>

              </div>

              <div className="flex justify-between text-[14px]">

                <span className="text-[#777d8b]">
                  Remaining
                </span>

                <span className="font-semibold">
                  {remainingCount}
                </span>

              </div>

              <div className="flex justify-between text-[14px]">

                <span className="text-[#777d8b]">
                  Marked
                </span>

                <span className="font-semibold text-[#e99a00]">
                  {markedCount}
                </span>

              </div>

            </div>

          </div>

        </aside>

        {/* =================================================
            CENTER QUESTION
        ================================================= */}

        <section>

          <div className="min-h-[575px] rounded-[20px] border border-[#e0e1e7] bg-white p-8">

            {/* Question Header */}

            <div className="mb-5 flex items-center gap-3">

              <span className="rounded-full bg-[#f1e9ff] px-3 py-1 text-[12px] font-bold text-[#7937e8]">
                Multiple choice
              </span>

              <span className="text-[14px] font-semibold text-[#707583]">
                Question {currentQuestion}
              </span>

            </div>

            {/* Question */}

            <h1 className="mb-8 text-[24px] font-bold tracking-[-0.5px]">
              {current.questionText}
            </h1>

            {/* Options */}

            <div className="space-y-4">

              {current.options.map(
                (option, index) => {

                  // Check selected option
                  const selected =
                    answers[current._id] ===
                    index;

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        selectAnswer(index)
                      }
                      className={`flex w-full items-center rounded-[28px] border-2 px-5 py-5 text-left transition ${
                        selected
                          ? "border-[#7d36ed] bg-[#f6f2ff] text-[#7132dc]"
                          : "border-[#e0e1e6] bg-white hover:border-[#c7a9f6]"
                      }`}
                    >

                      {/* Radio */}

                      <span
                        className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          selected
                            ? "border-[#7d36ed]"
                            : "border-[#c4c7ce]"
                        }`}
                      >

                        {selected && (
                          <span className="h-3 w-3 rounded-full bg-[#7d36ed]" />
                        )}

                      </span>

                      {/* Option */}

                      <span
                        className={`text-[18px] ${
                          selected
                            ? "font-bold"
                            : "font-medium text-[#333846]"
                        }`}
                      >
                        {option}
                      </span>

                    </button>
                  );
                }
              )}

            </div>

            {/* Saved message */}

            <div className="mt-7 flex items-center gap-2 text-[12px] text-[#7d8290]">

              <Save size={15} />

              Your answer is saved automatically.

            </div>

          </div>

        </section>

        {/* =================================================
            RIGHT COLUMN
        ================================================= */}

        <aside className="space-y-4">

          {/* Assessment Progress */}

          <div className="rounded-[20px] border border-[#e0e1e7] bg-white p-6">

            <h2 className="text-center text-[14px] font-bold">
              Assessment progress
            </h2>

            {/* Donut */}

            <div className="my-5 flex justify-center">

              <div
                className="relative flex h-[125px] w-[125px] items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(
                    #7b36e8 ${
                      progressPercentage *
                      3.6
                    }deg,
                    #f1effa ${
                      progressPercentage *
                      3.6
                    }deg
                  )`,
                }}
              >

                <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-white">

                  <span className="text-[20px] font-bold text-[#7837e8]">
                    {progressPercentage}%
                  </span>

                </div>

              </div>

            </div>

            <div className="text-center">

              <p className="text-[14px] text-[#7b808d]">
                {answeredCount} of{" "}
                {questions.length} answered
              </p>

              <p className="mt-2 text-[14px] font-bold">
                {formatTime()} remaining
              </p>

            </div>

          </div>

          {/* Quick Tips */}

          <div className="rounded-[20px] border border-[#e0e1e7] bg-white p-6">

            <div className="mb-4 flex items-center gap-2">

              <Lightbulb
                size={16}
                className="text-[#f1a500]"
              />

              <h2 className="text-[14px] font-bold">
                Quick tips
              </h2>

            </div>

            <div className="space-y-4">

              <div className="flex gap-2">

                <Check
                  size={15}
                  className="mt-0.5 shrink-0 text-[#17a05d]"
                />

                <p className="text-[13px] leading-5 text-[#7a7f8b]">
                  Read every question twice.
                </p>

              </div>

              <div className="flex gap-2">

                <Check
                  size={15}
                  className="mt-0.5 shrink-0 text-[#17a05d]"
                />

                <p className="text-[13px] leading-5 text-[#7a7f8b]">
                  Skip the difficult ones and return later.
                </p>

              </div>

              <div className="flex gap-2">

                <Check
                  size={15}
                  className="mt-0.5 shrink-0 text-[#17a05d]"
                />

                <p className="text-[13px] leading-5 text-[#7a7f8b]">
                  Keep an eye on your time.
                </p>

              </div>

              <div className="flex gap-2">

                <Check
                  size={15}
                  className="mt-0.5 shrink-0 text-[#17a05d]"
                />

                <p className="text-[13px] leading-5 text-[#7a7f8b]">
                  Stay calm — you have got this.
                </p>

              </div>

            </div>

          </div>

        </aside>

      </main>

      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <footer className="fixed bottom-0 left-0 right-0 flex h-[70px] items-center justify-end gap-3 border-t border-[#e2e2e7] bg-white px-9">

        {/* Previous */}

        <button
          onClick={goPrevious}
          disabled={currentQuestion === 1}
          className="flex items-center gap-2 rounded-full border border-[#e0e1e7] px-6 py-3 text-[14px] font-semibold transition hover:bg-[#f7f7f9] disabled:cursor-not-allowed disabled:opacity-40"
        >

          <ArrowLeft size={16} />

          Previous

        </button>

        {/* Mark */}

        <button
          onClick={toggleMark}
          className={`flex items-center gap-2 rounded-full border px-6 py-3 text-[14px] font-semibold transition ${
            markedQuestions.includes(
              currentQuestion
            )
              ? "border-[#7837e8] bg-[#f5efff] text-[#7837e8]"
              : "border-[#7837e8] text-[#7837e8] hover:bg-[#f7f1ff]"
          }`}
        >

          <Flag size={16} />

          {markedQuestions.includes(
            currentQuestion
          )
            ? "Marked"
            : "Mark for review"}

        </button>

        {/* Clear */}

        <button
          onClick={clearAnswer}
          className="flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-[#686d7a] hover:bg-[#f7f7f9]"
        >

          <Eraser size={16} />

          Clear

        </button>

        {/* Next */}

        {currentQuestion === questions.length ? (
        <button
          onClick={submitExam}
          className="flex items-center gap-2 rounded-full bg-[#16a34a] px-8 py-3 text-[16px] font-bold text-white shadow-sm transition hover:bg-[#15803d]"
        >
          Submit Exam

          <Check size={17} />
        </button>
      ) : (
        <button
          onClick={goNext}
          className="flex items-center gap-2 rounded-full bg-[#7837e8] px-8 py-3 text-[16px] font-bold text-white shadow-sm transition hover:bg-[#692bd4]"
        >
          Next

          <ArrowRight size={17} />
        </button>
      )}

      </footer>

    </div>
  );
}

export default ExamStart;