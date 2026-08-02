function GrowthCard({
    type,
    image,
    background,
    step,
    title,
    description,
    align,
}) {

    if (type === "image") {
        return (
            <div className="w-[480px] h-[430px] rounded-[24px] overflow-hidden flex-shrink-0">

                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />

            </div>
        );
    }

    return (

        <div
            className="w-[705px] h-[430px] rounded-[24px] text-white flex-shrink-0"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>

            <div className={`h-[190px] flex item-center px-14 py-24`}>
                <div className={`max-w-[490px] ${align === "right"
                        ? "ml-auto text-right"
                        : "mr-auto text-left"}`}>

                    <p className="text-[18px] font-bold">
                        {step}
                    </p>

                    <h2 className="mt-2 text-[48px] font-bold">
                        {title}
                    </h2>

                    <p className="mt-4 text-[22px]">
                        {description}
                    </p>

                </div>
                </div>
            </div>
    );
}

export default GrowthCard;