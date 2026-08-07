function Hashtag() {

    const hashtags = [
        "aining",
        "#SPORTS",
        "#CODING",
        "#ROBOTICS",
        "#ART",
        "#CHESS",
        "#PUBLICSPEAKING",
        "#PHOTOGRAPHY",
        "#THEATRE"
    ];

    return (
        <section className="w-full bg-[#7C3AED]">

            <div className="w-full mb-16">

                <div className="flex items-center justify-between pr-4 h-[70px]">

                    {hashtags.map((item, index) => (

                        <span
                            key={index}
                            className="text-white text-[24px] font-bold whitespace-nowrap"
                        >
                            {item}
                        </span>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Hashtag;