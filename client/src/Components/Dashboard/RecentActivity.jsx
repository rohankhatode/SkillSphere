import React from "react";
import {
  Award,
  Brain,
  CalendarDays,
  BookOpen,
  UserRound,
} from "lucide-react";

function RecentActivity() {
  const activities = [
    {
      icon: Award,
      text: "Certificate uploaded — Graphic Design",
      time: "Yesterday",
      bg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      icon: Brain,
      text: "Psychometric test completed",
      time: "2 days ago",
      bg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: CalendarDays,
      text: "Upcoming exam scheduled — Math",
      time: "3 days ago",
      bg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      icon: BookOpen,
      text: "Course joined — Robotics",
      time: "5 days ago",
      bg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: UserRound,
      text: "Parent updated profile",
      time: "1 week ago",
      bg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <section className="mt-7">

      <div className="mb-4">
        <h2 className="text-[16px] font-bold text-gray-900">
          Recent Activity
        </h2>

        <p className="text-[14px] text-gray-500 mt-1">
          Latest updates on Aarav's account
        </p>
      </div>

      <div className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">

        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className={`flex items-center justify-between px-5 py-4 ${
                index !== activities.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}>

              {/* Left Side */}
              <div className="flex items-center gap-4">

                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.bg}`}>
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className={activity.iconColor}
                  />
                </div>

                <p className="text-[14px] font-medium text-gray-800">
                  {activity.text}
                </p>

              </div>

              {/* Time */}
              <span className="text-[12px] text-gray-400">

                {activity.time}
              </span>
            </div>
          );
        })}

      </div>
    </section>
  );
}

export default RecentActivity;