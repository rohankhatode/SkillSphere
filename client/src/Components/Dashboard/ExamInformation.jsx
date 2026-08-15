import React, { useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import owlHeader from "../../assets/images/owl img1.png";
import owl from "../../assets/images/owl img2.png";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  List,
  Wifi,
  BatteryCharging,
  Volume2,
  BookOpen,
  Lightbulb,
  
} from "lucide-react";

function ExamInformation() {
  const [agreed, setAgreed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    examId,
    childId,
    resultId,
  } = location.state || {};

  console.log("Exam ID:", examId);
  console.log("Child ID:", childId);
  console.log("Result ID:", resultId);

  const beforeStart = [
    {
      icon: Wifi,
      title: "Stable internet",
      description: "Make sure your connection stays steady for the full test.",
    },
    {
      icon: BatteryCharging,
      title: "Fully charged device",
      description: "Charge your laptop or tablet before you begin.",
    },
    {
      icon: Volume2,
      title: "Quiet environment",
      description: "Pick a calm, distraction-free corner.",
    },
    {
      icon: BookOpen,
      title: "Read carefully",
      description: "Read every question fully before answering.",
    },
    {
      icon: CheckCircle2,
      title: "One attempt",
      description: "This assessment can be attempted only once.",
    },
  ];

  const examRules = [
    {
      text: "The timer cannot be paused once you start.",
      type: "purple",
    },
    {
      text: "Do not refresh or close the browser tab.",
      type: "blue",
    },
    {
      text: "Every answer is saved automatically.",
      type: "green",
    },
    {
      text: "You can mark questions and return to them later.",
      type: "yellow",
    },
    {
      text: "Submit before the timer runs out.",
      type: "red",
    },
  ];

  const syllabus = [
    "Fractions",
    "Algebra",
    "Geometry",
    "Word Problems",
    "Logical Reasoning",
  ];

  const examSteps = [
    {
      number: "1",
      title: "Read instructions",
      subtitle: "Know the plan",
    },
    {
      number: "2",
      title: "Solve questions",
      subtitle: "One at a time",
    },
    {
      number: "3",
      title: "Review answers",
      subtitle: "Flag & re-check",
    },
    {
      number: "4",
      title: "Submit",
      subtitle: "Lock it in",
    },
    {
      number: "5",
      title: "Instant result",
      subtitle: "Instant score",
    },
    {
      number: "6",
      title: "Recommendations",
      subtitle: "What's next",
    },
  ];

  const tips = [
    "Read every question twice.",
    "Keep an eye on your time.",
    "Trust yourself.",
    "Skip the difficult ones and return later.",
    "Stay calm — you have got this.",
  ];

  if (!examId || !childId || !resultId) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">
          Exam session not found
        </h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-[#7938F5] text-white px-6 py-2 rounded-full"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

const handleBeginExam = () => {
  navigate(`/exam/${examId}/questions`, {
    state: {
      examId,
      childId,
      resultId,
    },
  });
};
  return (
    <div className="min-h-screen bg-white text-[#171321]">

      {/* ================= MAIN AREA ================= */}
      <div className="flex pb-28">

        {/* ================= CONTENT ================= */}
        <main className="flex-1">

          {/* Back */}
          <button className="flex items-center gap-2 text-[24px] font-medium mb-8">
            <ArrowLeft size={21} />
            Back
          </button>


          {/* ================= HERO ================= */}
          <section className="rounded-[18px] overflow-hidden border border-[#E8E4EF]">

            <div className="relative h-[132px] bg-[#6D2BD1] px-8 flex items-center overflow-hidden">

              {/* Decorative circles */}
              <div className="absolute -left-8 -bottom-20 w-[210px] h-[210px] rounded-full bg-white/10" />

              <div className="absolute left-[280px] -top-12 w-[180px] h-[180px] rounded-full bg-white/10" />

              {/* Text */}
              <div className="relative z-10 max-w-[600px]">

                <h1 className="text-white text-[36px] font-bold">
                  Ready to begin?
                </h1>

                <p className="text-white/80 text-[16px] leading-5 mt-1">
                  Take your time. Read each question carefully. Your progress
                  <br />
                  is saved automatically.
                </p>

              </div>

              {/* Owl illustration placeholder */}
              <div className="mb-7">
                
                <img src={owlHeader} alt="owl" className="w-[333px] h-[222px]"/>

              </div>

            </div>


            {/* Exam details */}
            <div className="p-5 grid grid-cols-3 gap-4 bg-white">

              <InfoBox
                title="Duration"
                value="45 minutes"
              />

              <InfoBox
                title="Questions"
                value="12"
              />

              <InfoBox
                title="Question types"
                value="MCQ + Fill in the blanks + Short answers"
              />

              <InfoBox
                title="Attempts"
                value="1 attempt"
              />

              <InfoBox
                title="Passing score"
                value="60%"
              />

              <InfoBox
                title="Time per question"
                value="4-5 mins"
              />

            </div>

          </section>


          {/* ================= BEFORE + RULES ================= */}
          <div className="grid grid-cols-2 gap-4 mt-5">

            {/* Before start */}
            <section className="border border-[#E8E4EF] rounded-[18px] p-5">

              <h2 className="text-[16px] font-bold mb-5">
                Before you start
              </h2>

              <div className="space-y-2">

                {beforeStart.map((item, index) => (
                  <div
                    key={index}
                    className="border border-[#E7E4ED] rounded-[18px] px-4 py-3 flex items-center gap-3"
                  >

                    <div className="w-8 h-8 rounded-full bg-[#DDF8EA] flex items-center justify-center shrink-0">
                      <Check
                        size={16}
                        className="text-[#25B875]"
                      />
                    </div>

                    <div>
                      <p className="text-[14px] font-semibold">
                        {item.title}
                      </p>

                      <p className="text-[14px] text-[#85818B] mt-0.5">
                        {item.description}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </section>


            {/* Exam rules */}
            <section className="border border-[#E8E4EF] rounded-[18px] p-5">

              <h2 className="text-[16px] font-bold mb-5">
                Exam rules
              </h2>

              <div className="space-y-2">

                {examRules.map((rule, index) => (
                  <RuleItem
                    key={index}
                    text={rule.text}
                    type={rule.type}
                  />
                ))}

              </div>

            </section>

          </div>


          {/* ================= SYLLABUS ================= */}
          <section className="border border-[#E8E4EF] rounded-[18px] p-5 mt-5">

            <h2 className="text-[14px] font-bold mb-5">
              Syllabus
            </h2>

            <div className="flex items-center gap-7 flex-wrap">

              {syllabus.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-[14px] font-medium"
                >

                  <div className="w-6 h-6 rounded-full bg-[#DDF8EA] flex items-center justify-center">
                    <Check
                      size={14}
                      className="text-[#25B875]"
                    />
                  </div>

                  {item}

                </div>
              ))}

            </div>

          </section>


          {/* ================= HOW EXAM WORKS ================= */}
          <section className="border border-[#E8E4EF] rounded-[18px] p-5 mt-5">

            <h2 className="text-[16px] font-bold mb-5">
              How the exam works
            </h2>

            <div className="grid grid-cols-6 gap-3">

              {examSteps.map((step) => (
                <div
                  key={step.number}
                  className="h-[123px] rounded-[18px] border border-[#E4E0EA] flex flex-col items-center justify-center text-center"
                >

                  <div className="w-10 h-10 rounded-full bg-[#7B35ED] text-white flex items-center justify-center text-[14px] font-semibold mb-2">
                    {step.number}
                  </div>

                  <p className="text-[14px] font-semibold">
                    {step.title}
                  </p>

                  <p className="text-[12px] text-[#85818B] mt-1">
                    {step.subtitle}
                  </p>
                </div>
              ))}

            </div>
          </section>


          {/* ================= TIPS ================= */}
          <section className="mt-5 rounded-[18px] border border-[#F0DFC0] bg-[#FFF8E8] p-5">

            <div className="flex items-center gap-5">

              {/* Owl */}
              <div className="w-[96px] h-[96px]">
                <img src={owl} alt="owl"/>
              </div>

              <div className="flex-1">

                <div className="flex items-center gap-2 mb-3">

                  <Lightbulb
                    size={16}
                    className="text-[#F5A000]"
                  />

                  <h2 className="text-[16px] font-bold">
                    Tips for success
                  </h2>

                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-2">

                  {tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >

                      <div className="w-3 h-3 rounded-full border border-[#F5A000] flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-[#F5A000]" />
                      </div>

                      <span className="text-[14px] text-[#4F4A43]">
                        {tip}
                      </span>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </section>
        </main>
      </div>


      {/* ================= FIXED BOTTOM BAR ================= */}
      <footer className="fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-[#E7E4ED] flex items-center justify-between px-12 z-50">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 accent-[#7938F5]"
          />

          <span className="text-[14px] font-medium">
            I have read all instructions
          </span>

        </label>


        <button
          disabled={!agreed}
          onClick={handleBeginExam}
          className={`h-[42px] px-8 rounded-full flex items-center gap-2 text-[16px] font-semibold text-white transition
            ${
              agreed
                ? "bg-[#7938F5] hover:bg-[#6828DB]"
                : "bg-[#CFC9D9] cursor-not-allowed"
            }
          `}
        >
          Start exam
          <ArrowRight size={16} />
        </button>
      </footer>
    </div>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="bg-[#F8F8FA] rounded-[18px] px-4 py-3 h-[54px]">

      <p className="text-[9px] text-[#89858F]">
        {title}
      </p>

      <p className="text-[11px] font-semibold mt-1">
        {value}
      </p>

    </div>
  );
}


function RuleItem({ text, type }) {

  const styles = {
    purple: "bg-[#F3EEFF] text-[#6D3BD4]",
    blue: "bg-[#E5F6FD] text-[#2586A9]",
    green: "bg-[#E4F8EF] text-[#279E6D]",
    yellow: "bg-[#FFF4D9] text-[#C98B22]",
    red: "bg-[#FFE7E7] text-[#D84E55]",
  };

  return (
    <div
      className={`h-[49px] rounded-full px-4 flex items-center gap-3 ${styles[type]}`}
    >

      <List size={13} />

      <span className="text-[14px] font-medium">
        {text}
      </span>

    </div>
  );
}

export default ExamInformation;