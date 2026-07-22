import { Icon } from "@iconify/react";

function CourseCard({image,title,type,rating,avatar,provider}) {
  return (
    <div
      className="w-[330px] h-[430px] bg-white rounded-[16px] border border-[#E5E7EB] p-4 
                hover:shadow-xl hover:-translate-y-1">
      <img src={image} alt={title} className="w-[286px] h-[190px] rounded-[6px]"/>

      <div className="mt-3">
        <div className="flex items-center justify-between">

          <span
            className="px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-[13px] font-medium">
            {type}
          </span>

          <div className="flex items-center gap-1">

            <Icon icon="material-symbols:star-rounded" className="text-[#F59E0B] text-[18px]"/>

            <span className="text-[14px] font-medium">
              {rating}
            </span>

          </div>

        </div>

        <h3
          className="mt-4 text-[20px] font-bold text-[#111827]">
          {title}
        </h3>

        <div className="flex items-center mt-4">

          <img src={avatar} alt={provider} className="w-9 h-9 rounded-full"/>

          <span className="ml-3 text-[14px] text-[#6B7280]">
            Provided by{" "}
            <span className="font-semibold text-[#111827]">
              {provider}
            </span>
          </span>
        </div>
        
        <button
          className="mt-5 w-[286px] h-[44px] px-[16px] py-[10px] rounded-full bg-[#7C3AED]
          text-white font-medium flex items-center justify-center gap-2 hover:bg-[#6D28D9]">
          Join Now

          <Icon
            icon="iconoir:arrow-right" />
        </button>
      </div>
    </div>
  );
}

export default CourseCard;