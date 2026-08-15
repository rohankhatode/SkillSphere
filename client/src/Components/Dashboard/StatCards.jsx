import React from "react";

import {
  Brain,
  Award,
  CircleCheck,
  CalendarClock,
  BookOpen,
} from "lucide-react";

function StatCards({ stats }) {

  const statCards = [
      {
          title: "Psychometric Score",
          value: `${stats?.psychometricScore ?? 0}%`,
          icon: Brain,
          iconColor: "text-[#7C3AED]",
          iconBg: "bg-[#F1EAFE]",
      },
      {
          title: "Certificates",
          value: stats?.certificates ?? 0,
          icon: Award,
          iconColor: "text-[#2563EB]",
          iconBg: "bg-[#EEF4FF]",
      },
      {
          title: "Completed Test",
          value: stats?.completedTests ?? 0,
          icon: CircleCheck,
          iconColor: "text-[#10B981]",
          iconBg: "bg-[#ECFDF5]",
      },
      {
          title: "Upcoming Exams",
          value: stats?.upcomingExams ?? 0,
          icon: CalendarClock,
          iconColor: "text-[#F59E0B]",
          iconBg: "bg-[#FFF7E6]",
      },
      {
          title: "Courses",
          value: stats?.courses ?? 0,
          icon: BookOpen,
          iconColor: "text-[#EC4899]",
          iconBg: "bg-[#FCEFF5]",
      },
  ];


return(

    <div className="flex-1">
      <div className="mb-6">

        <h1 className="text-[24px] font-semibold text-[#111827]">
          Overview
        </h1>

      </div>

      <div className="grid grid-cols-5 gap-4 w-full">

      {statCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="h-[82px] bg-white border border-[#E9E7F0] rounded-2xl px-4 flex items-center gap-3">

            {/* Icon */}
            <div className={`w-[40px] h-[40px] rounded-xl flex items-center justify-center
                ${stat.iconBg}
              `}>
          
              <Icon size={20}
                strokeWidth={2}
                className={stat.iconColor}/>
            </div>

            <div>

              <p className="text-[12px] text-[#9CA3AF]">
                {stat.title}
              </p>

              <p
                className="text-[24px] font-bold text-[#111827]">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}

    </div>
    </div>
)
}

export default StatCards;


