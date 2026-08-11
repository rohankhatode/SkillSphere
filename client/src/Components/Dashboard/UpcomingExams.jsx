import React from "react";
import {
  Bell,
  Play,
  Clock3,
  FileText,
  Download,
  Award,
  Timer,
} from "lucide-react";

const upcomingExams = [
  {
    day: "28",
    month: "JUL",
    title: "Math Assessment",
    date: "28 July 2026",
    time: "09:30 AM",
    duration: "45 Minutes",
    questions: "30 MCQs",
    starts: "Starts in 3 Days",
    reminder: true,
    startExam: true,
  },
  {
    day: "31",
    month: "JUL",
    title: "English Reading Assessment",
    date: "31 July 2026",
    time: "10:00 AM",
    duration: "30 Minutes",
    questions: "20 MCQs",
    starts: "Starts in 6 Days",
    reminder: true,
    startExam: false,
  },
  {
    day: "04",
    month: "AUG",
    title: "Logical Reasoning Test",
    date: "04 August 2026",
    time: "11:00 AM",
    duration: "60 Minutes",
    questions: "40 MCQs",
    starts: "Starts in 10 Days",
    reminder: true,
    startExam: false,
  },
];

const completedExams = [
  {
    name: "Math Practice Test",
    score: "92%",
    action: "View Result",
  },
  {
    name: "Science Quiz",
    score: "88%",
    action: "View Result",
  },
  {
    name: "Coding Assessment",
    score: "95%",
    action: "Download Certificate",
  },
];

function UpcomingExams() {
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
            03
          </h2>
        </div>

        <div className="rounded-2xl bg-[#DDF5E8] px-5 py-5">
          <p className="text-[13px] text-gray-500">
            Completed
          </p>

          <h2 className="text-[20px] font-bold mt-2">
            12
          </h2>
        </div>

        <div className="rounded-2xl bg-[#E5EEFF] px-5 py-5">
          <p className="text-[13px] text-gray-500">
            Average Score
          </p>

          <h2 className="text-[20px] font-bold mt-2">
            86%
          </h2>
        </div>

        <div className="rounded-2xl bg-[#FFF2D7] px-5 py-5">
          <p className="text-[13px] text-gray-500">
            Next Exam
          </p>

          <h2 className="text-[18px] font-bold mt-2">
            Math Assessment
          </h2>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-5">

        {/* LEFT COLUMN */}
        <div>

          {/* UPCOMING EXAM CARDS */}
          <div className="space-y-3">

            {upcomingExams.map((exam, index) => (

              <div
                key={index}
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
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-full text-[12px] font-medium hover:bg-[#6D28D9]">
                          <Play size={16} />
                          Start Exam
                        </button>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            ))}

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

              {completedExams.map((exam, index) => (

                <div
                  key={index}
                  className={`flex items-center justify-between py-4 ${
                    index !== completedExams.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >

                  <div>

                    <p className="text-[14px] font-semibold">
                      {exam.name}
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
                        {exam.score}
                      </p>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-[14px]">
                      {exam.action === "View Result" ? (
                        <FileText size={14} />
                      ) : (
                        <Download size={14} />
                      )}

                      {exam.action}
                    </button>

                  </div>

                </div>

              ))}

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
                value="15"
                bg="#F0E8FF"
              />

              <SummaryCard
                title="Completed"
                value="12"
                bg="#DDF5E8"
              />

              <SummaryCard
                title="Upcoming"
                value="3"
                bg="#E5EEFF"
              />

              <SummaryCard
                title="Average Score"
                value="86%"
                bg="#FFF2D7"
              />

              <SummaryCard
                title="Highest Score"
                value="98%"
                bg="#FCE7EF"
              />

              <SummaryCard
                title="Certificates Earned"
                value="8"
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
                Math Assessment
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">

                <div className="bg-white rounded-2xl py-3 text-center">
                  <p className="text-[18px] font-bold">
                    2
                  </p>

                  <p className="text-[12px] text-gray-400">
                    Days
                  </p>
                </div>

                <div className="bg-white rounded-2xl py-3 text-center">
                  <p className="text-[18px] font-bold">
                    14
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

            <p className="text-[14px] font-semibold">
              Science Assessment
            </p>

            <div className="flex justify-between items-end mt-4">

              <div>
                <p className="text-[12px] text-gray-400">
                  Score
                </p>
              </div>

              <p className="text-[24px] font-bold text-[#7C3AED]">
                91%
              </p>

            </div>

            {/* PROGRESS */}
            <div className="h-2 bg-[#E9DDFD] rounded-full mt-2">
              <div className="w-[91%] h-full bg-[#7C3AED] rounded-full" />
            </div>

            <div className="flex items-center gap-2 mt-3 text-[12px] text-gray-400">

              <Award size={14} className="text-[#F59E0B]" />

              Performance

              <span className="bg-[#DDF5E8] text-[#16A34A] px-2 py-1 rounded-full">
                Excellent
              </span>

            </div>

            <button className="w-full mt-4 bg-[#F3EEFF] rounded-full py-3 text-[14px] font-medium">
              View Result
            </button>
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
                78%
              </span>

            </div>

            <div className="h-2 bg-[#E9DDFD] rounded-full mt-3">
              <div className="w-[78%] h-full bg-[#7C3AED] rounded-full" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* SUMMARY CARD */

function SummaryCard({ title, value, bg }) {
  return (
    <div
      className="rounded-2xl px-4 py-5"
      style={{ backgroundColor: bg }}
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