import GrowthCard from "./GrowthCard";
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
        description:"Create a profile around your child's interests, age, and goals to begin their unique growth journey.",
        align: "left"
    },
    {
        type: "step",
        background: growthcard,
        step: "Step 2",
        title: "Find the Right Fit",
        description: "Discover activities, courses, and trusted providers that match what your child loves and wants to explore.",
        align: "right"
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
        title: "Learn. Practice. Grow.",
        description:"Connect with the right provider, build real world skills, and turn every interest into meaningful progress.",
        align: "left"
    },
    {
        type: "step",
        background: growthcard,
        step: "Step 4",
        title: "Celebrate Every Win",
        description:"Receive verified certificates and keep every milestone and achievements safely organized on SkillShaper.",
        align: "right"
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
        title: "Shape Their Story",
        description:"Build skills, activities, and certificates together in one powerful portfolio that grows with your child.",
        align: "left"
    }
];

    return (
    <section className="w-full py-20">

        <div className="max-w-[1320px] mx-auto">

            <div className="max-w-[700px] mx-auto text-center">

                <p className="text-[#7C3AED] font-semibold text-[16px]">
                    THE GROWTH JOURNEY
                </p>

                <h2 className="mt-2 text-[48px] font-bold">

                    <span>From Curiosity to </span>

                    <span className="text-[#7C3AED]">
                        Achievement
                    </span>
                </h2>
                <p className="mt-4 w-[515px] mx-auto text-[14px] text-[#6B7280]">
                    Turn your child's interests into real skills,
                    meaningful achievements, and a portfolio that
                    grows with them.
                </p>

            </div>
            <div className="w-[1210px] mx-auto mt-10 space-y-8">

                <div className="flex justify-between items-center">

                    <GrowthCard {...cards[0]} />
                    <GrowthCard {...cards[1]} />

                </div>

                <div className="flex justify-between items-center">

                    <GrowthCard {...cards[2]} />
                    <GrowthCard {...cards[3]} />

                </div>

                <div className="flex justify-between items-center">

                    <GrowthCard {...cards[4]} />
                    <GrowthCard {...cards[5]} />

                </div>

                <div className="flex justify-between items-center">

                    <GrowthCard {...cards[6]} />
                    <GrowthCard {...cards[7]} />

                </div>

                <div className="flex justify-between items-center">

                    <GrowthCard {...cards[8]} />
                    <GrowthCard {...cards[9]} />

                </div>
            </div>
        </div>
    </section>
);
}

export default Growth;
