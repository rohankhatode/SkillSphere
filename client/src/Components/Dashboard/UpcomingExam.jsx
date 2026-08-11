import React from "react";
import {
  CalendarDays,
  Play,
  BookOpen,
  Bell,
} from "lucide-react";

function UpcomingExam() {
  return (
    <div className="mt-8">

      <div className="mb-4">

        <h2 className="text-[16px] font-bold text-[#111827]">
          Upcoming Exam
        </h2>

        <p className="text-[14px] text-gray-600">
          Next scheduled assessment
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div
          className="bg-white border border-[#E9E7F0] rounded-2xl p-5">

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">

              <div className="w-[40px] h-[40px rounded-xl bg-[#F1EAFE] flex items-center justify-center">
                <BookOpen
                  size={20}
                  className="text-[#7C3AED]"/>
              </div>

              <div>

                <h3 className="text-[16px] font-semibold text-[#111827]">
                  Mathematics Assessment
                </h3>

                <p className="text-[12px] text-[#9CA3AF]">
                  30 questions
                </p>

              </div>

            </div>

            <span
              className="p-3 rounded-full bg-[#FFF7E6] text-[#B45309] text-[12px] font-medium">
              Starts Tomorrow
            </span>

          </div>

          <div className="px-4 py-4 rounded-xl bg-[#E9E2FF] mt-4 grid grid-cols-3">
            <div>
              
              <p className="text-[12px] font-medium text-gray-400">
                DATE
              </p>
              <p className="text-[14px] font-medium text-black">
                28Jul
              </p>
            
            </div>

            <div>

              <p className="text-[12px] font-medium text-gray-400">
                TIME
              </p>
              <p className="text-[14px] font-medium text-black">
                9:30 AM
              </p>

            </div>

            <div>
              <p className="text-[12px] font-medium text-gray-400">
                DURATION
              </p>
              <p className="text-[14px] font-medium text-black">
                45 mins
              </p>

            </div>
          </div>
          <div className="flex gap-3 mt-3 items-center">
          <button className="flex justify-center items-center gap-2 rounded-full text-[12px] border border-[#E5E7EB] bg-gray-100
                  px-3 py-1 hover:bg-gray-200 transition shadow-slate-200 font-medium" >
                
                <Bell size={12} />
                Set Reminder
          </button>

          <button className="flex justify-center items-center gap-2 rounded-full text-[12px] text-white bg-[#7C3AED]
                  px-3 py-1 hover:bg-[#6D28D9] transition shadow-slate-200 font-medium" >
                
                <Play size={12} />
                Start Exam
          </button>
          </div>
        </div>

        <div
          className="bg-white order border-[#E9E7F0] rounded-2xl p-5">

          <div className="flex items-center justify-between mb-5">

            <h3 className="text-[16px] font-bold text-[#111827]">
              Upcoming Exams
            </h3>

            <button className="text-[12px] text-[#7C3AED] font-medium">
              View all
              
            </button>

          </div>

          <div className="flex items-center justify-between py-3 border-b border-[#F0EEF5]">

            <div className="flex items-center gap-3">

              <div className="w-[40px] h-[40px] rounded-lg bg-[#E9E2FF] flex items-center justify-center">
                <CalendarDays
                  size={17}
                  className="text-[#7C3AED]"
                />
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#374151]">
                  English
                </p>

                <p className="text-[12px] text-[#9CA3AF]">
                  31 Jul.11:00 AM
                </p>
              </div>

            </div>

            <span className="text-[12px] rounded-full px-2 py-1 bg-[#e7d84ba1] text-[#f18e23]">
              6 days left
            </span>

          </div>

          <div className="flex items-center justify-between py-3 border-b border-[#F0EEF5]">

            <div className="flex items-center gap-3">

              <div className="w-[40px] h-[40px] rounded-lg bg-[#E9E2FF] flex items-center justify-center">
                <CalendarDays
                  size={17}
                  className="text-[#7C3AED]"
                />
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#374151]">
                  Science
                </p>

                <p className="text-[12px] text-[#9CA3AF]">
                  15 Aug.10:00 AM
                </p>
              </div>
            </div>
            </div>
            </div>
          </div>
    </div>
  );
}

export default UpcomingExam;