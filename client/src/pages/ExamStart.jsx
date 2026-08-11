import React, { useEffect, useState } from "react";
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

const questions = [
  {
    id: 1,
    question: "What is 25% of 200?",
    options: ["25", "40", "50", "75"],
    answer: "50",
  },
  {
    id: 2,
    question: "Which fraction is equal to 1/2?",
    options: ["2/6", "2/4", "3/9", "4/12"],
    answer: "2/4",
  },
  {
    id: 3,
    question: "What is 5 × 6?",
    options: ["25", "30", "35", "40"],
    answer: "30",
  },
  {
    id: 4,
    question: "Which number is a prime number?",
    options: ["12", "15", "17", "21"],
    answer: "17",
  },
  {
    id: 5,
    question: "What is 100 ÷ 4?",
    options: ["20", "25", "30", "40"],
    answer: "25",
  },
  {
    id: 6,
    question: "What is 3²?",
    options: ["6", "9", "12", "15"],
    answer: "9",
  },
  {
    id: 7,
    question: "Which is the largest number?",
    options: ["0.5", "0.75", "0.25", "0.65"],
    answer: "0.75",
  },
  {
    id: 8,
    question: "What is 12 + 18?",
    options: ["20", "25", "30", "35"],
    answer: "30",
  },
  {
    id: 9,
    question: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    id: 10,
    question: "What is 50% of 80?",
    options: ["20", "30", "40", "50"],
    answer: "40",
  },
  {
    id: 11,
    question: "What is 7 × 8?",
    options: ["48", "54", "56", "64"],
    answer: "56",
  },
  {
    id: 12,
    question: "What is 100 - 45?",
    options: ["45", "50", "55", "65"],
    answer: "55",
  },
];

function ExamStart() {
  const [currentQuestion, setCurrentQuestion] = useState(2);

  const [answers, setAnswers] = useState({
    2: "2/6",
  });

  const [markedQuestions, setMarkedQuestions] = useState([]);

  const [timeLeft, setTimeLeft] = useState(44 * 60 + 5);

  const current = questions[currentQuestion - 1];

  /* ---------------------------------------------
     TIMER
  --------------------------------------------- */

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 0) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  /* ---------------------------------------------
     ANSWER SELECTION
  --------------------------------------------- */

  const selectAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    });
  };

  /* ---------------------------------------------
     QUESTION STATUS
  --------------------------------------------- */

  const answeredCount = Object.keys(answers).length;

  const markedCount = markedQuestions.length;

  const remainingCount = questions.length - answeredCount;

  const progressPercentage = Math.round(
    (answeredCount / questions.length) * 100
  );

  /* ---------------------------------------------
     MARK QUESTION
  --------------------------------------------- */

  const toggleMark = () => {
    if (markedQuestions.includes(currentQuestion)) {
      setMarkedQuestions(
        markedQuestions.filter((id) => id !== currentQuestion)
      );
    } else {
      setMarkedQuestions([
        ...markedQuestions,
        currentQuestion,
      ]);
    }
  };

  /* ---------------------------------------------
     NAVIGATION
  --------------------------------------------- */

  const goPrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const clearAnswer = () => {
    const updatedAnswers = { ...answers };

    delete updatedAnswers[currentQuestion];

    setAnswers(updatedAnswers);
  };

  /* ---------------------------------------------
     QUESTION STATUS COLOR
  --------------------------------------------- */

  const getQuestionStyle = (id) => {
    if (id === currentQuestion) {
      return "bg-[#7837e8] text-white shadow-md";
    }

    if (answers[id]) {
      return "bg-[#d6f5e8] text-[#12965b]";
    }

    if (markedQuestions.includes(id)) {
      return "bg-[#ffe1a8] text-[#a56600]";
    }

    return "bg-[#f7f7fa] text-[#687080]";
  };

  return (
    <div className="min-h-screen bg-white text-[#171b2b] mb-10">
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
              Question {currentQuestion} of {questions.length}
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

              {questions.map((question) => (

                <button
                  key={question.id}
                  onClick={() =>
                    setCurrentQuestion(question.id)
                  }
                  className={`flex h-[55px] items-center justify-center rounded-full text-[14px] font-semibold transition hover:scale-[1.03] ${getQuestionStyle(
                    question.id
                  )}`}
                >
                  {question.id}
                </button>

              ))}

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

              {current.question}

            </h1>


            {/* Options */}

            <div className="space-y-4">

              {current.options.map((option) => {

                const selected =
                  answers[currentQuestion] === option;

                return (

                  <button
                    key={option}
                    onClick={() => selectAnswer(option)}
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
              })}

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
                    #7b36e8 ${progressPercentage * 3.6}deg,
                    #f1effa ${progressPercentage * 3.6}deg
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
                {answeredCount} of {questions.length} answered
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
            markedQuestions.includes(currentQuestion)
              ? "border-[#7837e8] bg-[#f5efff] text-[#7837e8]"
              : "border-[#7837e8] text-[#7837e8] hover:bg-[#f7f1ff]"
          }`}
        >

          <Flag size={16} />

          {markedQuestions.includes(currentQuestion)
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

        <button
          onClick={goNext}
          disabled={currentQuestion === questions.length}
          className="flex items-center gap-2 rounded-full bg-[#7837e8] px-8 py-3 text-[16px] font-bold text-white shadow-sm transition hover:bg-[#692bd4] disabled:cursor-not-allowed disabled:opacity-40"
        >

          Next

          <ArrowRight size={17} />

        </button>

      </footer>

    </div>
  );
}

export default ExamStart;