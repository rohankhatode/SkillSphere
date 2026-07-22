import CategoryCard from "./CategoryCard";
import cardBg from "../../assets/images/card-bg.png";
import sport from "../../assets/images/Sport.svg";
import design from "../../assets/images/Design & Art.svg";
import coding from "../../assets/images/Coding.svg";
import music from "../../assets/images/Music & Dance.svg";
import robotics from "../../assets/images/Robotics.svg";
import photography from "../../assets/images/Photography.svg";

const cards = [
  {
    title: "Sport",
    image: sport,
    bg: cardBg,
    imageClass: "w-[150px] mt-2 mr-1",
    description: "Basketball helped me build discipline, confidence, and become a better team player.",
  },

  {
    title: "Design & Art",
    image: design,
    bg: cardBg,
    imageClass: "w-[190px]",
    description: "Painting gives me the freedom to express my ideas and explore my creativity.",
  },

  {
    title: "Coding",
    image: coding,
    bg: cardBg,
    imageClass: "w-[175px]",
    description:"Coding turned my curiosity into real projects and helped me enjoy solving problems.",
  },

  {
    title: "Music & Dance",
    image: music,
    bg: cardBg,
    imageClass: "w-[125px]",
    description: "Music helped me find my confidence and gave me the courage to perform.",
  },

  {
    title: "Robotics",
    image: robotics,
    bg: cardBg,
    imageClass: "w-[165px]",
    description: "Robotics makes learning exciting because I can build, test, and improve my own ideas.",
  },

  {
    title: "Photography",
    image: photography,
    bg: cardBg,
    imageClass: "w-[145px] mr-3",
    description:"Photography taught me to notice small details and capture stories in my own way.",
  },
];

function CategoryCards() {
  return (
    <section className="w-full">
      <div
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth px-8 pb-5">
        {cards.map((card, index) => (
          <CategoryCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            bg={card.bg}
            imageClass={card.imageClass} />
        ))}
      </div>

    </section>
  );
}

export default CategoryCards;