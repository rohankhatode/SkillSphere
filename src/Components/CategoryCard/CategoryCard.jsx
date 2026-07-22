function CategoryCard({title, description, image, bg, imageClass}) {
  return (
    <div
      className="relative w-[330px] h-[350px] rounded-[17px] flex-shrink-0
                cursor-pointer hover:translate-y-2">

      <img src={bg} alt="" className="absolute inset-0" />

      <div className="absolute top-0 left-0 w-full flex justify-end pt-4 pr-7">
        <img src={image} alt={title} className={`${imageClass} h-auto`} />
      </div>

      <div className="absolute bottom-6 left-6 right-6 text-white">

        <h2 className="text-[25px] font-bold">
          {title}
        </h2>

        <p className="mt-3 pr-2 text-[17px] text-white font-bold">
          "{description}"
        </p>
      </div>
    </div>
  );
}

export default CategoryCard;