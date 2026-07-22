import JourneyCard from "./GrowthCard";
import growthcard from "../../assets/images/growthcard-bg.png"

import growth1 from "../../assets/images/growth1.png";
import growth2 from "../../assets/images/growth2.png";
import growth3 from "../../assets/images/growth3.png";
import growth4 from "../../assets/images/growth4.png";
import growth5 from "../../assets/images/growth5.png";


function Growth() {

    const cards = [

        {
            type: "image",
            image: growth1
        },

        {
            type: "step",
            background: growthcard,
            step: "Step 1",
            title: "Know the Potential",
            description:
                "Create a profile around your child's interests, age, and goals to begin their unique growth journey."
        },

        {
            type: "step",
            background: growthcard,
            step: "Step 2",
            title: "Find the Right Fit",
            description:
                "Discover activities, courses, and trusted providers that match what your child loves."
        },

        {
            type: "image",
            image: growth2
        },

        {
            type: "image",
            image: growth3
        },

        {
            type: "step",
            background: growthcard,
            step: "Step 3",
            title: "Build Skills",
            description:
                "Learn through engaging activities and develop valuable real-world skills."
        },

        {
            type: "step",
            background: growthcard,
            step: "Step 4",
            title: "Earn Certificates",
            description:
                "Receive verified certificates and achievements from trusted providers."
        },

        {
            type: "image",
            image: growth4
        },

        {
            type: "image",
            image: growth5
        },

        {
            type: "step",
            background: growthcard,
            step: "Step 5",
            title: "Create Your Portfolio",
            description:
                "Build a lifelong portfolio showcasing every achievement and milestone."
        }

    ];

    return (

        <section className="w-full py-20">
            <div className="max-w-[1320px] h-[2500px] mx-auto">

                <div className="max-w-[700px] h-[144px] mx-auto text-center">

                    <p className="text-[#7C3AED] font-semibold text-[16px]">
                        THE GROWTH JOURNEY
                    </p>

                    <h2 className="text-[48px] font-bold">

                        <span>From Curiosity to </span>

                        <span className="text-[#7C3AED]">
                            Achievement
                        </span>
                    </h2>

                    <p className="mt-3 w-[515px] mx-auto px-10 text-[14px] text-[#6B7280]">
                        Turn your child's interests into real skills, meaningful achievements, 
                        and a portfolio that grows with them.
                    </p>
                </div>

                <div className="w-[1210px] mt-20 grid grid-cols-2 gap-8">

                    {cards.map((card, index) => (

                        <JourneyCard
                            key={index}
                            type={card.type}
                            image={card.image}
                            background={card.background}
                            step={card.step}
                            title={card.title}
                            description={card.description} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Growth;