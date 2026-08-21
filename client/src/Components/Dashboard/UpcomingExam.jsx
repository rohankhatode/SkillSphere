
import { Bell, CalendarDays, Play, ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";


function UpcomingExam({exams=[],childId}) {
  
  // --------------------------------------------------
  // NO EXAMS
  // --------------------------------------------------
  const navigate = useNavigate();

  if (exams.length === 0) {
    return (
      <section className="w-full">
        <div className="mb-4 mt-5">
          <h2 className="text-[16px] font-bold text-[#15151d]">
            Upcoming Exam
          </h2>

          <p className="text-[14px] text-gray-400 mt-1">
            Next scheduled assessment
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">
            No upcoming exams.
          </p>
        </div>
      </section>
    );
  }

  const mainExam = exams[0];
  const otherExams = exams.slice(1);

  // --------------------------------------------------
  // DATE
  // --------------------------------------------------

  const examDate = new Date(mainExam.date);

  const day = examDate.getDate();

  const month = examDate
    .toLocaleString("en-US", {
      month: "short",
    })
    .toUpperCase();

  // --------------------------------------------------
  // DAYS LEFT
  // --------------------------------------------------

  const today = new Date();

  const difference =
    examDate.setHours(0, 0, 0, 0) -
    new Date(today.setHours(0, 0, 0, 0));

  const daysLeft = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  const getDaysText = () => {
    if (daysLeft <= 0) {
      return "Starts Today";
    }

    if (daysLeft === 1) {
      return "Starts Tomorrow";
    }

    return `Starts in ${daysLeft} Days`;
  };

  // --------------------------------------------------
  // REMINDER
  // --------------------------------------------------

  const handleReminder = () => {
    alert(`Reminder set for ${mainExam.title}`);
  };

  // --------------------------------------------------
  // START EXAM
  // --------------------------------------------------

  const handleStartExam = () => {
  try {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      return;
    }

    if (!childId) {
      alert("Child information is missing");
      return;
    }

    const examId = mainExam._id || mainExam.id;

    if (!examId) {
      alert("Exam ID is missing");
      return;
    }

    console.log("Navigating to Exam Information:", {
      examId,
      childId,
      exam: mainExam,
    });

    navigate("/exam-information", {
      state: {
        examId,
        childId,
        exam: mainExam,
      },
    });

  } catch (error) {
    console.error("Start Exam Error:", error);
    alert("Something went wrong while starting the exam");
  }
};

  return (
    <section className="w-full">

      {/* --------------------------------------------- */}
      {/* SECTION TITLE */}
      {/* --------------------------------------------- */}

      <div className="flex items-start justify-between mb-4 mt-5">

        <div>
          <h2 className="text-[16px] font-bold text-[#15151d]">
            Upcoming Exam
          </h2>

          <p className="text-[14px] text-gray-400 mt-1">
            Next scheduled assessment
          </p>
        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* MAIN CONTENT */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-3">

        {/* =========================================== */}
        {/* MAIN EXAM CARD */}
        {/* =========================================== */}

        <div className="bg-white rounded-2xl border border-gray-200 p-4">

          {/* TOP */}

          <div className="flex items-start justify-between">

            <div className="flex items-start gap-4">

              {/* ICON */}

              <div className="w-10 h-10 rounded-xl bg-[#fff8e7] flex items-center justify-center">

                <CalendarDays
                  size={20}
                  strokeWidth={1.8}
                  className="text-[#ff9f00]"
                />

              </div>


              {/* TITLE */}

              <div>

                <h3 className="text-[16px] font-bold text-[#15151d]">
                  {mainExam.title}
                </h3>

                <p className="text-[12px] text-gray-400 mt-1">
                  {mainExam.totalQuestions} questions
                </p>

              </div>

            </div>


            {/* STARTS BADGE */}

            <div className="px-3 rounded-full border border-[#ffc95b] bg-[#fffaf0]">

              <span className="text-[12px] font-medium text-[#e99a00]">
                {getDaysText()}
              </span>

            </div>

          </div>


          {/* ----------------------------------------- */}
          {/* EXAM INFORMATION */}
          {/* ----------------------------------------- */}

          <div className="mt-4 bg-[#f4f1ff] rounded-xl px-4 py-3">

            <div className="grid grid-cols-3">

              {/* DATE */}

              <div>

                <p className="text-[12px] uppercase text-gray-500 font-medium">
                  Date
                </p>

                <p className="text-[14px] font-semibold text-[#20202a] mt-1">
                  {day} {month}
                </p>

              </div>


              {/* TIME */}

              <div>

                <p className="text-[12px] uppercase text-gray-500 font-medium">
                  Time
                </p>

                <p className="text-[14px] font-semibold text-[#20202a] mt-1">
                  {mainExam.startTime}
                </p>

              </div>


              {/* DURATION */}

              <div>

                <p className="text-[12px] uppercase text-gray-500 font-medium">
                  Duration
                </p>

                <p className="text-[14px] font-semibold text-[#20202a] mt-1">
                  {mainExam.duration} mins
                </p>

              </div>

            </div>

          </div>


          {/* ----------------------------------------- */}
          {/* BUTTONS */}
          {/* ----------------------------------------- */}

          <div className="flex items-center gap-2 mt-3">

            {/* REMINDER */}

            <button
              onClick={handleReminder}
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-full
                border border-gray-200
                bg-white
                text-[12px]
                font-medium
                text-[#22222a]
                hover:bg-gray-50
                transition
              "
            >

              <Bell size={14} />

              Set Reminder

            </button>


            {/* START EXAM */}

            <button
              onClick={handleStartExam}
            
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-[#7c3aed]
                text-white
                text-[12px]
                font-medium
                hover:bg-[#6d28d9]
                transition
              "
            >

              <Play
                size={13}
                
              />

              Start Exam

            </button>

          </div>

        </div>


        {/* =========================================== */}
        {/* OTHER UPCOMING EXAMS */}
        {/* =========================================== */}

        <div className="bg-white rounded-2xl border border-gray-200 p-4">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-3">

            <h3 className="text-[16px] font-bold text-[#15151d]">
              Upcoming Exams
            </h3>

            <button
              className="
                flex
                items-center
                gap-1
                text-[12px]
                text-[#7c3aed]
                font-medium
              "
            >
              View all

              <ArrowRight size={11} />

            </button>

          </div>


          {/* ----------------------------------------- */}
          {/* EXAM LIST */}
          {/* ----------------------------------------- */}

          {otherExams.length === 0 ? (

            <div className="py-5">

              <p className="text-[12px] text-gray-400">
                No other upcoming exams.
              </p>

            </div>

          ) : (

            <div>

              {otherExams.map((exam, index) => {

                const date = new Date(exam.date);

                const formattedDate =
                  date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  });

                return (

                  <div
                  key={exam._id || exam.id}                    
                  className={`
                      flex
                      items-center
                      justify-between
                      py-3
                      ${
                        index !== otherExams.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }
                    `}
                  >

                    {/* LEFT */}

                    <div className="flex items-center gap-3">

                      <div className="
                        w-8
                        h-8
                        rounded-full
                        bg-[#f5f1ff]
                        flex
                        items-center
                        justify-center
                      ">

                        <CalendarDays
                          size={15}
                          className="text-[#7c3aed]"
                        />

                      </div>


                      <div>

                        <p className="text-[16px] font-medium text-[#20202a]">
                          {exam.subject || exam.title}
                        </p>

                        <p className="text-[12px] text-gray-400 mt-1">
                          {formattedDate} · {exam.startTime}
                        </p>

                      </div>

                    </div>


                    {/* DAYS LEFT */}

                    <div className="
                      px-2
                      py-1
                      rounded-full
                      bg-[#fff7df]
                    ">

                      <span className="text-[12px] font-medium text-[#e99a00]">
                        {getDaysRemaining(exam.date)} days left
                      </span>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}


// =====================================================
// DAYS REMAINING
// =====================================================

function getDaysRemaining(dateValue) {

  const examDate = new Date(dateValue);

  const today = new Date();

  examDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const difference =
    examDate.getTime() - today.getTime();

  return Math.max(
    0,
    Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  );
}

export default UpcomingExam;