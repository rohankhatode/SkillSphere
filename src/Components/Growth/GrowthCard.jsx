function GrowthCard({
    type,
    image,
    background,
    step,
    title,
    description,
}) {

    if (type === "image") {
        return (
            <div className="relative w-[480px] h-[430px] rounded-[24px] overflow-hidden">

                <img
                    src={image}
                    alt={title}
                    className="relative w-full h-full object-cover"
                />
            </div>
        );
    }

    return (
        <div className="relative w-[650px] h-[430px] rounded-[22px] text-white"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} >

            <div className="text-left pl-10 pt-24 mt-4 max-w-[650px]">

                <p className="text-[18px] font-semibold">
                    {step}
                </p>

                <h2 className="mt-1 text-[48px] font-bold">
                    {title}
                </h2>

                <p className="mt-1 text-[22px] max-w-[460px]">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default GrowthCard;