import React from "react";
import Avatar from "../../assets/icons/Avatar.png"
import {
  User,
  Users,
  School,
  MapPin,
  Sparkles,
  Target,
  Edit3,
  Hash,
  Code2Icon,
  BotIcon,
} from "lucide-react";

function AccountDetails() {
  return (
    <div className="w-full">
      <div className="mb-5">

        <h1 className="text-[24px] font-bold text-[#171717]">
          Account Details
        </h1>
      </div>

      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#962BEF] to-[#6424A5] px-7 py-6 mb-5">

        {/* Decorative circles */}
        <div className="absolute -left-16 -bottom-24 w-64 h-64 rounded-full bg-white/10"></div>

        <div className="absolute left-[45%] -bottom-24 w-40 h-40 rounded-full bg-white/10"></div>

        <div className="absolute right-[-60px] -top-24 w-64 h-64 rounded-full bg-white/10"></div>

        <div className="relative flex items-center justify-between">

          {/* Student information */}
          <div className="flex items-center gap-5">
            <div className="w-[92px] h-[92px] rounded-full flex items-center justify-center overflow-hidden">

              <img
                src={Avatar}
                alt="Student"
              />

            </div>

            <div>

              <h2 className="text-white text-[30px] font-bold">
                Aarav Mahatre
              </h2>

              <div className="flex items-center gap-5 mt-2 text-white/80 text-sm">

                <span className="flex items-center gap-1">
                  <School size={15} />
                  Grade 5
                </span>

                <span className="flex items-center gap-1">
                  <Hash size={15} />
                  SS-2024-0042
                </span>

                <span className="flex items-center gap-1">
                  <MapPin size={15} />
                  Pune, India
                </span>
              </div>
            </div>
          </div>

          <div className="text-right text-white mr-3">

            <p className="text-sm text-white">
              Profile completion
            </p>

            <h2 className="text-[30px] font-bold">
              100%
            </h2>
          </div>
        </div>
      </div>


      {/*PERSONAL INFORMATION*/}
      <InfoCard
        icon={<User size={20} />}
        iconBg="bg-[#7E22CE]"
        iconColor="text-white"
        title="Personal Information"
        bg="bg-[#F7F2FE]"
      >

        <div className="grid grid-cols-3 gap-y-5">

          <DetailItem
            label="Full name"
            value="Aarav Mahatre"
          />

          <DetailItem
            label="Gender"
            value="Male"
          />

          <DetailItem
            label="Date of birth"
            value="2015-04-12"
          />

          <DetailItem
            label="Age"
            value="10 years"
          />

          <DetailItem
            label="Language"
            value="English, Hindi, Marathi"
          />

        </div>
      </InfoCard>


      {/*PARENT INFORMATION*/}

      <InfoCard
        icon={<Users size={20} />}
        iconBg="bg-[#1D4ED8]"
        iconColor="text-white"
        title="Parent Information"
        bg="bg-[#F5F8FD]"
      >

        <div className="grid grid-cols-3 gap-y-5">

          <DetailItem
            label="Father"
            value="Aarav Mahatre"
          />

          <DetailItem
            label="Mother"
            value="Sarah Mahatre"
          />

          <DetailItem
            label="Phone"
            value="+91 98200 12345"
          />

          <DetailItem
            label="Email"
            value="sarah.mahatre@example.com"
          />

          <DetailItem
            label="Emergency contact"
            value="+91 98200 67890"
          />

        </div>
      </InfoCard>


      {/*SCHOOL DETAILS*/}

      <InfoCard
        icon={<School size={20} />}
        iconBg="bg-[#047857]"
        iconColor="text-white"
        title="School Details"
        bg="bg-[#F4FCF6]"
      >

        <div className="grid grid-cols-3">

          <DetailItem
            label="School"
            value="Green Valley Public School"
          />

          <DetailItem
            label="Grade"
            value="Grade 5"
          />

        </div>

      </InfoCard>

      {/*LOCATION*/}

      <InfoCard
        icon={<MapPin size={20} />}
        iconBg="bg-[#B45309]"
        iconColor="text-white"
        title="Location"
        bg="bg-[#FDF9F5]"
      >

        <div className="grid grid-cols-3 gap-5">

          <DetailItem
            label="City"
            value="Mumbai"
          />

          <DetailItem
            label="Nationality"
            value="Indian"
          />

          <DetailItem
            label="Address"
            value="12 Lotus Residency, Powai, Mumbai 400076"
          />

        </div>

      </InfoCard>


      {/*INTERESTS*/}

      <InfoCard
        icon={<Sparkles size={20} />}
        iconBg="bg-[#BE185D]"
        iconColor="text-white"
        title="Interests"
        bg="bg-[#FEF6F8]"
      >

        <div className="flex gap-2 flex-wrap">

          <Tag
            text="Football"
            type="pink"
          />

          <Tag
            text="Robotics"
            type="pink"
          />

          <Tag
            text="Reading"
            type="pink"
          />

          <Tag
            text="Painting"
            type="pink"
          />

        </div>

      </InfoCard>


      {/*GOALS*/}

      <InfoCard
        icon={<Target size={20} />}
        iconBg="bg-[#7E22CE]"
        iconColor="text-white"
        title="Goals"
        bg="bg-[#F9F8FE]"
      >

        <div className="flex gap-2 flex-wrap">

          <Icon
            text="Improve Math"
            type="purple"
            icon={<Target size={16} />}
          />

          <Icon
            text="Learn Coding"
            type="purple"
            icon={<Code2Icon size={16} />}
          />

          <Icon
            text="Robotics"
            type="purple"
            icon={<BotIcon size={16} />}
          />

        </div>

      </InfoCard>
    </div>
  );
}


/*INFO CARD*/

function InfoCard({
  icon,
  iconBg,
  iconColor,
  title,
  children,
  bg
}) {
  return (
    <div className={`border border-[#E7E7EF] rounded-[20px] px-5 py-5 mb-4 ${bg}`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`} >
            {icon}
          </div>

          <h2 className="text-[18px] font-bold text-[#171717]">
            {title}
          </h2>

        </div>

        {/* Edit button */}
        <button
          className="flex items-center gap-2 border border-[#8635F4] text-[#8635F4] px-4 py-1.5 rounded-full 
          text-sm font-medium hover:bg-[#F7F0FF] transition">

          <Edit3 size={14} />
          Edit
        </button>
      </div>

      {children}

    </div>
  );
}


/*DETAIL ITEM*/

function DetailItem({ label, value }) {
  return (
    <div>

      <p className="text-[12px] text-[#8A8A98] mb-1">
        {label}
      </p>

      <p className="text-[14px] font-medium text-[#171717]">
        {value}
      </p>

    </div>
  );
}


/*TAG*/

function Tag({ text, type }) {

  const styles =
    type === "pink"
      ? "bg-[#FFF1F7] border-[#F6C9DE] text-[#D92D72]"
      : "bg-[#F7F0FF] border-[#E0C8FF] text-[#8035E8]";

  return (
    <span className={`px-3 py-1.5 rounded-full border text-[14px] font-medium ${styles}`}>

      ≡ {text}
    </span>
  );
}

function Icon({ text, type,icon }) {

  const styles =
    type === "p"
      ? "bg-[#FFF1F7] border-[#F6C9DE] text-[#D92D72]"
      : "bg-[#F7F0FF] border-[#E0C8FF] text-[#8035E8]";

  return (
    <div className={`flex justify-center items-center px-3 py-1.5 rounded-full border text-[14px] font-medium ${styles}`}>

      <span className={`pr-2`}>{icon}</span> {text}
    </div>
  );
}

export default AccountDetails;