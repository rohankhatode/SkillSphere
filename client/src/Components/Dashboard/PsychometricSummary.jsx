import React from "react";
import {
  Sparkles,
  Eye,
  TrendingUp,
  Target,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

function PsychometricSummary() {
  return (
    <section className="mt-6">
      <div className="flex items-end justify-between mb-3">

        <div>
          <h2 className="text-[16px] font-bold text-[#111827]">
            Psychometric Summary
          </h2>

          <p className="text-[14px] text-[#9CA3AF] mt-1">
            AI-powered insights into Aarav's learning profile
          </p>
        </div>

        <button
          className="
            bg-[#7C3AED]
            hover:bg-[#6D28D9]
            text-white
            px-6
            py-2
            rounded-full
            text-[14px]
            font-semibold
            flex
            items-center
            gap-2
            transition
          ">
          Retake Test

          <ArrowRight size={18} />
        </button>
      </div>

      <div className="bg-white border border-[#E8E8F0] rounded-2xl p-4">
        <div className="grid grid-cols-[410px_1fr] gap-5">

          <div className="bg-[#FCFBFF] rounded-xl w-[410px] min-h-[385px] flex items-center justify-center">
 
            <RadarChart />

          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-3">

              {/* Persona */}

              <InsightCard
                icon={<Sparkles size={15} />}
                iconBg="bg-[#F3E8FF]"
                iconColor="text-[#8B5CF6]"
                label="PERSONA"
                title="Creative Explorer"
                description="Creative, curious and solution-oriented."
              />

              {/* Learning Style */}

              <InsightCard
                icon={<Eye size={15} />}
                iconBg="bg-[#EEF4FF]"
                iconColor="text-[#3B82F6]"
                label="LEARNING STYLE"
                title="Visual Learner"
                description="Prefers diagrams, videos and visual examples."
              />

              {/* Strongest Skill */}

              <InsightCard
                icon={<TrendingUp size={15} />}
                iconBg="bg-[#ECFDF5]"
                iconColor="text-[#10B981]"
                label="STRONGEST SKILL"
                title="Problem Solving"
                description="95% proficiency"
              />

              {/* Career Interest */}

              <InsightCard
                icon={<Target size={15} />}
                iconBg="bg-[#FFF0F6]"
                iconColor="text-[#EC4899]"
                label="CAREER INTEREST"
                title="Design & Technology"
                description="Top recommended field"
              />
            </div>

            <div className="mt-3 bg-[#F7F0FF] rounded-xl p-3 flex items-start gap-3 border-l-4 border-[#8B5CF6]">
 
              {/* Icon */}

              <div className="w-7 h-7 rounded-lg bg-[#EDE1FF] flex items-center justify-center shrink-0">
                
                <Lightbulb
                  size={16}
                  className="text-[#8B5CF6]"
                />
              </div>

              {/* Text */}

              <div>

                <p className="text-[12px] font-semibold text-[#8B5CF6]">
                  AI INSIGHT
                </p>

                <p className="text-[14px] text-[#4B5563] mt-1 leading-5">
                  Aarav excels at solving complex problems with creativity
                  and enjoys visual, hands-on learning experiences.
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-3">

              <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2 rounded-full text-[14px]
                  font-semibold transition">
                View Full Psychometric Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

  //  INSIGHT CARD

function InsightCard({
  icon,
  iconBg,
  iconColor,
  label,
  title,
  description,
}) {
  return (
    <div className="border border-[#E8E8F0] rounded-xl px-3 py-3 min-h-[105px]">
      <div className="flex items-center gap-2">

        <div
          className={`
            w-8
            h-8
            rounded-lg
            ${iconBg}
            ${iconColor}
            flex
            items-center
            justify-center
          `}>

          {icon}
        </div>

        <span className="text-[12px] text-[#9CA3AF] font-medium">
          {label}
        </span>

      </div>

      <h3 className="text-[14px] font-semibold text-[#111827] mt-2">
        {title}
      </h3>

      <p className="text-[12px] text-[#9CA3AF] mt-1">
        {description}
      </p>

    </div>
  );
}

/* ============================================================
   RADAR CHART
============================================================ */

function RadarChart() {

  const center = 150;
  const radius = 90;

  const labels = [
    {
      name: "Creativity",
      value: 90,
      angle: -90,
    },
    {
      name: "Problem Solving",
      value: 95,
      angle: -45,
    },
    {
      name: "Communication",
      value: 84,
      angle: 0,
    },
    {
      name: "Leadership",
      value: 78,
      angle: 45,
    },
    {
      name: "Innovation",
      value: 88,
      angle: 90,
    },
    {
      name: "Logical Thinking",
      value: 92,
      angle: 135,
    },
    {
      name: "Focus",
      value: 82,
      angle: 180,
    },
    {
      name: "Collaboration",
      value: 88,
      angle: 225,
    },
  ];


  /* Convert polar coordinates */

  const getPoint = (angle, r) => {

    const radians = (angle * Math.PI) / 180;

    return {
      x: center + r * Math.cos(radians),
      y: center + r * Math.sin(radians),
    };

  };


  /* Radar polygon */

  const dataPoints = labels
    .map((item) => {

      const point = getPoint(
        item.angle,
        (item.value / 100) * radius
      );

      return `${point.x},${point.y}`;

    })
    .join(" ");


  /* Grid polygons */

  const gridLevels = [25, 50, 75, 100];


  return (
    <div className="relative w-[300px] h-[300px]">

      <svg
        viewBox="0 0 300 300"
        className="w-full h-full"
      >

        {/* ================= GRID ================= */}

        {gridLevels.map((level) => {

          const points = labels
            .map((item) => {

              const point = getPoint(
                item.angle,
                (level / 100) * radius
              );

              return `${point.x},${point.y}`;

            })
            .join(" ");

          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="#E4DDF7"
              strokeWidth="1"
            />
          );

        })}


        {/* ================= AXES ================= */}

        {labels.map((item) => {

          const point = getPoint(item.angle, radius);

          return (
            <line
              key={item.name}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#E5DEF5"
              strokeWidth="1"
            />
          );

        })}


        {/* ================= DATA ================= */}

        <polygon
          points={dataPoints}
          fill="#8B5CF6"
          fillOpacity="0.12"
          stroke="#7C3AED"
          strokeWidth="2"
        />


        {/* ================= DATA POINTS ================= */}

        {labels.map((item) => {

          const point = getPoint(
            item.angle,
            (item.value / 100) * radius
          );

          return (
            <circle
              key={item.name}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="#7C3AED"
            />
          );

        })}

      </svg>


      {/* ================= LABELS ================= */}

      {labels.map((item) => {

        const labelPoint = getPoint(
          item.angle,
          radius + 27
        );

        let transform = "translate(-50%, -50%)";

        if (item.angle === -90) {
          transform = "translate(-50%, -50%)";
        }

        if (item.angle === 90) {
          transform = "translate(-50%, -30%)";
        }

        if (item.angle === 0) {
          transform = "translate(0%, -50%)";
        }

        if (item.angle === 180) {
          transform = "translate(-100%, -50%)";
        }

        return (
          <div
            key={item.name}
            className="
              absolute
              text-center
              whitespace-nowrap
            "
            style={{
              left: `${(labelPoint.x / 300) * 100}%`,
              top: `${(labelPoint.y / 300) * 100}%`,
              transform,
            }}
          >

            <p className="text-[10px] font-medium text-[#6B7280]">
              {item.name}
            </p>

            <p className="text-[10px] font-bold text-[#7C3AED]">
              {item.value}
            </p>

          </div>
        );

      })}


      {/* ================= LEGEND ================= */}

      <div
        className="
          absolute
          bottom-[-5px]
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          whitespace-nowrap
        "
      >

        <span className="flex items-center gap-1 text-[12px] text-[#9CA3AF]">

          <span className="w-3 h-3 rounded-full bg-[#7C3AED]" />

          Skill Score

        </span>

        <span className="text-[12px] text-[#C4C4CC]">
          Max 100
        </span>

      </div>

    </div>
  );
}

export default PsychometricSummary;