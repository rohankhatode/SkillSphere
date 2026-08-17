import React, { useEffect, useState } from "react";
import API_URL from "../../config/api";
import Avatar from "../../assets/icons/Avatar.png";

import {
  User,
  Users,
  School,
  MapPin,
  Sparkles,
  Target,
  Edit3,
  X,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

function AccountDetails() {

  // =====================================================
  // ACCOUNT DATA
  // =====================================================

  const [accountData, setAccountData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const [showEditModal, setShowEditModal] = useState(false);

  const [saving, setSaving] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({

    fullName: "",
    gender: "",
    dob: "",
    language: "",

    father: "",
    mother: "",
    phone: "",
    email: "",
    emergencyContact: "",

    school: "",
    grade: "",

    city: "",
    state: "",
    address: "",

    interests: [],
    goals: [],

  });


  // =====================================================
  // FETCH ACCOUNT DETAILS
  // =====================================================

  useEffect(() => {

    fetchAccountDetails();

  }, []);


  const fetchAccountDetails = async () => {

    try {

      setLoading(true);
      setError("");

      const childId =
        localStorage.getItem("childId");

      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");


      if (!childId) {

        throw new Error(
          "Child not found"
        );

      }


      if (!token) {

        throw new Error(
          "User not authenticated"
        );

      }


      const response = await fetch(

        `${API_URL}/dashboard/account/${childId}`,

        {
          method: "GET",

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );


      const data =
        await response.json();


      console.log(
        "Account Details Response:",
        data
      );


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to load account details"
        );

      }


      setAccountData(data.data);

    }

    catch (err) {

      console.error(
        "Account Details Error:",
        err
      );

      setError(
        err.message ||
        "Unable to load account details"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEdit = () => {

    if (!accountData) {
      return;
    }


    setFormData({

      fullName:
        accountData.personalInformation.fullName || "",

      gender:
        accountData.personalInformation.gender || "",

      dob:
        accountData.personalInformation.dob
          ? accountData.personalInformation.dob.substring(0, 10)
          : "",

      language:
        accountData.personalInformation.language || "",


      father:
        accountData.parentInformation.father || "",

      mother:
        accountData.parentInformation.mother || "",

      phone:
        accountData.parentInformation.phone || "",

      email:
        accountData.parentInformation.email || "",

      emergencyContact:
        accountData.parentInformation.emergencyContact || "",


      school:
        accountData.schoolDetails.school || "",

      grade:
        accountData.schoolDetails.grade || "",


      city:
        accountData.location.city || "",

      state:
        accountData.location.state || "",

      address:
        accountData.location.address || "",


      interests:
        accountData.interests || [],

      goals:
        accountData.goals || [],

    });


    setSaveMessage("");

    setShowEditModal(true);

  };


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));

  };


  // =====================================================
  // HANDLE ARRAY INPUT
  // =====================================================

  const handleArrayChange = (
    field,
    index,
    value
  ) => {

    setFormData((previous) => {

      const updated =
        [...previous[field]];

      updated[index] = value;

      return {

        ...previous,

        [field]: updated,

      };

    });

  };


  // =====================================================
  // ADD ARRAY ITEM
  // =====================================================

  const addArrayItem = (field) => {

    setFormData((previous) => ({

      ...previous,

      [field]: [
        ...previous[field],
        "",
      ],

    }));

  };


  // =====================================================
  // REMOVE ARRAY ITEM
  // =====================================================

  const removeArrayItem = (
    field,
    index
  ) => {

    setFormData((previous) => ({

      ...previous,

      [field]:
        previous[field].filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),

    }));

  };


  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSave = async () => {

    try {

      setSaving(true);

      setSaveMessage("");

      const childId =
        localStorage.getItem("childId");

      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");


      if (!childId) {

        throw new Error(
          "Child not found"
        );

      }


      if (!token) {

        throw new Error(
          "User not authenticated"
        );

      }


      // Remove empty interests/goals

      const cleanedInterests =
        formData.interests
          .map((item) => item.trim())
          .filter((item) => item !== "");


      const cleanedGoals =
        formData.goals
          .map((item) => item.trim())
          .filter((item) => item !== "");


      const payload = {

        fullName:
          formData.fullName,

        gender:
          formData.gender,

        dob:
          formData.dob,

        language:
          formData.language,


        father:
          formData.father,

        mother:
          formData.mother,

        phone:
          formData.phone,

        email:
          formData.email,

        emergencyContact:
          formData.emergencyContact,


        school:
          formData.school,

        grade:
          formData.grade,


        city:
          formData.city,

        state:
          formData.state,

        address:
          formData.address,


        interests:
          cleanedInterests,

        goals:
          cleanedGoals,

      };


      console.log(
        "Update Payload:",
        payload
      );


      const response = await fetch(

        `${API_URL}/dashboard/account/${childId}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },

          body:
            JSON.stringify(payload),

        }

      );


      const data =
        await response.json();


      console.log(
        "Update Account Response:",
        data
      );


      if (!response.ok) {

        throw new Error(

          data.message ||
          "Unable to update account"

        );

      }


      // ============================================
      // UPDATE UI WITH NEW DATA
      // ============================================

      setAccountData(data.data);


      setSaveMessage(
        "Account details updated successfully"
      );


      // Close modal shortly after success

      setTimeout(() => {

        setShowEditModal(false);

        setSaveMessage("");

      }, 1000);

    }

    catch (err) {

      console.error(
        "Update Account Error:",
        err
      );

      setSaveMessage(

        err.message ||
        "Unable to update account"

      );

    }

    finally {

      setSaving(false);

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="p-6">

        Loading account details...

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="p-6">

        <p className="text-red-500">

          {error}

        </p>

      </div>

    );

  }


  if (!accountData) {

    return null;

  }


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="w-full">

      {/* ================================================= */}
      {/* PAGE TITLE */}
      {/* ================================================= */}

      <div className="mb-5">

        <h1 className="text-[24px] font-bold text-[#171717]">

          Account Details

        </h1>

      </div>


      {/* ================================================= */}
      {/* PROFILE HEADER */}
      {/* ================================================= */}

      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#962BEF] to-[#6424A5] px-7 py-6 mb-5">

        <div className="absolute -left-16 -bottom-24 w-64 h-64 rounded-full bg-white/10" />

        <div className="absolute left-[45%] -bottom-24 w-40 h-40 rounded-full bg-white/10" />

        <div className="absolute right-[-60px] -top-24 w-64 h-64 rounded-full bg-white/10" />


        <div className="relative flex items-center justify-between">

          <div className="flex items-center gap-5">

            <div className="w-[92px] h-[92px] rounded-full flex items-center justify-center overflow-hidden">

              <img
                src={Avatar}
                alt="Student"
              />

            </div>


            <div>

              <h2 className="text-white text-[30px] font-bold">

                {
                  accountData
                    .personalInformation
                    .fullName
                }

              </h2>


              <div className="flex items-center gap-5 mt-2 text-white/80 text-sm">

                <span className="flex items-center gap-1">

                  <School size={15} />

                  {
                    accountData
                      .schoolDetails
                      .grade
                  }

                </span>


                <span className="flex items-center gap-1">

                  <MapPin size={15} />

                  {
                    accountData
                      .location
                      .city
                  },

                  {" "}

                  {
                    accountData
                      .location
                      .state
                  }

                </span>

              </div>

            </div>

          </div>


          <div className="text-right text-white mr-3">

            <p className="text-sm">

              Profile completion

            </p>

            <h2 className="text-[30px] font-bold">

              100%

            </h2>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* PERSONAL INFORMATION */}
      {/* ================================================= */}

      <InfoCard
        icon={<User size={20} />}
        iconBg="bg-[#7E22CE]"
        iconColor="text-white"
        title="Personal Information"
        bg="bg-[#F7F2FE]"
        onEdit={handleEdit}
      >

        <div className="grid grid-cols-3 gap-y-5">

          <DetailItem
            label="Full name"
            value={
              accountData
                .personalInformation
                .fullName
            }
          />

          <DetailItem
            label="Gender"
            value={
              accountData
                .personalInformation
                .gender
            }
          />

          <DetailItem
            label="Date of birth"
            value={
              new Date(
                accountData
                  .personalInformation
                  .dob
              ).toLocaleDateString("en-IN")
            }
          />

          <DetailItem
            label="Age"
            value={
              `${accountData.personalInformation.age} years`
            }
          />

          <DetailItem
            label="Language"
            value={
              accountData
                .personalInformation
                .language
            }
          />

        </div>

      </InfoCard>


      {/* ================================================= */}
      {/* PARENT INFORMATION */}
      {/* ================================================= */}

      <InfoCard
        icon={<Users size={20} />}
        iconBg="bg-[#1D4ED8]"
        iconColor="text-white"
        title="Parent Information"
        bg="bg-[#F5F8FD]"
        onEdit={handleEdit}
      >

        <div className="grid grid-cols-3 gap-y-5">

          <DetailItem
            label="Father"
            value={
              accountData
                .parentInformation
                .father
            }
          />

          <DetailItem
            label="Mother"
            value={
              accountData
                .parentInformation
                .mother
            }
          />

          <DetailItem
            label="Phone"
            value={
              accountData
                .parentInformation
                .phone
            }
          />

          <DetailItem
            label="Email"
            value={
              accountData
                .parentInformation
                .email
            }
          />

          <DetailItem
            label="Emergency contact"
            value={
              accountData
                .parentInformation
                .emergencyContact
            }
          />

        </div>

      </InfoCard>


      {/* ================================================= */}
      {/* SCHOOL */}
      {/* ================================================= */}

      <InfoCard
        icon={<School size={20} />}
        iconBg="bg-[#047857]"
        iconColor="text-white"
        title="School Details"
        bg="bg-[#F4FCF6]"
        onEdit={handleEdit}
      >

        <div className="grid grid-cols-3">

          <DetailItem
            label="School"
            value={
              accountData
                .schoolDetails
                .school
            }
          />

          <DetailItem
            label="Grade"
            value={
              accountData
                .schoolDetails
                .grade
            }
          />

        </div>

      </InfoCard>


      {/* ================================================= */}
      {/* LOCATION */}
      {/* ================================================= */}

      <InfoCard
        icon={<MapPin size={20} />}
        iconBg="bg-[#B45309]"
        iconColor="text-white"
        title="Location"
        bg="bg-[#FDF9F5]"
        onEdit={handleEdit}
      >

        <div className="grid grid-cols-3 gap-5">

          <DetailItem
            label="City"
            value={
              accountData.location.city
            }
          />

          <DetailItem
            label="State"
            value={
              accountData.location.state
            }
          />

          <DetailItem
            label="Address"
            value={
              accountData.location.address
            }
          />

        </div>

      </InfoCard>


      {/* ================================================= */}
      {/* INTERESTS */}
      {/* ================================================= */}

      <InfoCard
        icon={<Sparkles size={20} />}
        iconBg="bg-[#BE185D]"
        iconColor="text-white"
        title="Interests"
        bg="bg-[#FEF6F8]"
        onEdit={handleEdit}
      >

        <div className="flex gap-2 flex-wrap">

          {accountData.interests.map(
            (interest, index) => (

              <Tag
                key={`${interest}-${index}`}
                text={interest}
                type="pink"
              />

            )
          )}

        </div>

      </InfoCard>


      {/* ================================================= */}
      {/* GOALS */}
      {/* ================================================= */}

      <InfoCard
        icon={<Target size={20} />}
        iconBg="bg-[#7E22CE]"
        iconColor="text-white"
        title="Goals"
        bg="bg-[#F9F8FE]"
        onEdit={handleEdit}
      >

        <div className="flex gap-2 flex-wrap">

          {accountData.goals.map(
            (goal, index) => (

              <IconTag
                key={`${goal}-${index}`}
                text={goal}
              />

            )
          )}

        </div>

      </InfoCard>


      {/* ================================================= */}
      {/* EDIT MODAL */}
      {/* ================================================= */}

      {showEditModal && (

        <EditModal

          formData={formData}

          handleChange={handleChange}

          handleArrayChange={
            handleArrayChange
          }

          addArrayItem={
            addArrayItem
          }

          removeArrayItem={
            removeArrayItem
          }

          handleSave={
            handleSave
          }

          saving={
            saving
          }

          saveMessage={
            saveMessage
          }

          onClose={() => {

            if (!saving) {

              setShowEditModal(false);

            }

          }}

        />

      )}

    </div>

  );

}


// =====================================================
// INFO CARD
// =====================================================

function InfoCard({
  icon,
  iconBg,
  iconColor,
  title,
  children,
  bg,
  onEdit
}) {

  return (

    <div
      className={`border border-[#E7E7EF] rounded-[20px] px-5 py-5 mb-4 ${bg}`}
    >

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}
          >

            {icon}

          </div>


          <h2 className="text-[18px] font-bold text-[#171717]">

            {title}

          </h2>

        </div>


        <button
          onClick={onEdit}
          className="flex items-center gap-2 border border-[#8635F4] text-[#8635F4] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#F7F0FF] transition"
        >

          <Edit3 size={14} />

          Edit

        </button>

      </div>


      {children}

    </div>

  );

}


// =====================================================
// EDIT MODAL
// =====================================================

function EditModal({
  formData,
  handleChange,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
  handleSave,
  saving,
  saveMessage,
  onClose
}) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden">

        {/* ================================================= */}
        {/* MODAL HEADER */}
        {/* ================================================= */}

        <div className="flex items-center justify-between px-6 py-4 border-b">

          <div>

            <h2 className="text-xl font-bold text-gray-900">

              Edit Account Details

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              Update the student's account information

            </p>

          </div>


          <button
            onClick={onClose}
            disabled={saving}
            className="p-2 rounded-full hover:bg-gray-100"
          >

            <X size={20} />

          </button>

        </div>


        {/* ================================================= */}
        {/* MODAL BODY */}
        {/* ================================================= */}

        <div className="overflow-y-auto max-h-[70vh] px-6 py-5">

          {/* PERSONAL */}

          <FormSection title="Personal Information">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">

                  Gender

                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                >

                  <option value="">
                    Select gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />


              <Input
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />

            </div>

          </FormSection>


          {/* PARENT */}

          <FormSection title="Parent Information">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                label="Father"
                name="father"
                value={formData.father}
                onChange={handleChange}
              />

              <Input
                label="Mother"
                name="mother"
                value={formData.mother}
                onChange={handleChange}
              />

              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />

            </div>

          </FormSection>


          {/* SCHOOL */}

          <FormSection title="School Details">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                label="School"
                name="school"
                value={formData.school}
                onChange={handleChange}
              />

              <Input
                label="Grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              />

            </div>

          </FormSection>


          {/* LOCATION */}

          <FormSection title="Location">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />

              <div className="md:col-span-2">

                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

            </div>

          </FormSection>


          {/* INTERESTS */}

          <ArrayEditor
            title="Interests"
            values={formData.interests}
            field="interests"
            handleArrayChange={
              handleArrayChange
            }
            addArrayItem={
              addArrayItem
            }
            removeArrayItem={
              removeArrayItem
            }
          />


          {/* GOALS */}

          <ArrayEditor
            title="Goals"
            values={formData.goals}
            field="goals"
            handleArrayChange={
              handleArrayChange
            }
            addArrayItem={
              addArrayItem
            }
            removeArrayItem={
              removeArrayItem
            }
          />

        </div>


        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="border-t px-6 py-4 flex items-center justify-between">

          <div>

            {saveMessage && (

              <p
                className={`text-sm ${
                  saveMessage.includes(
                    "successfully"
                  )
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >

                {saveMessage}

              </p>

            )}

          </div>


          <div className="flex gap-3">

            <button
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
            >

              Cancel

            </button>


            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] disabled:opacity-50"
            >

              {saving ? (

                "Saving..."

              ) : (

                <>
                  <Save size={16} />
                  Save Changes
                </>

              )}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}


// =====================================================
// FORM SECTION
// =====================================================

function FormSection({
  title,
  children
}) {

  return (

    <div className="mb-7">

      <h3 className="text-sm font-bold text-gray-800 mb-3">

        {title}

      </h3>

      {children}

    </div>

  );

}


// =====================================================
// INPUT
// =====================================================

function Input({
  label,
  name,
  value,
  onChange,
  type = "text"
}) {

  return (

    <div>

      <label className="block text-sm font-medium text-gray-700 mb-1">

        {label}

      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
      />

    </div>

  );

}


// =====================================================
// ARRAY EDITOR
// =====================================================

function ArrayEditor({
  title,
  values,
  field,
  handleArrayChange,
  addArrayItem,
  removeArrayItem
}) {

  return (

    <div className="mb-7">

      <div className="flex items-center justify-between mb-3">

        <h3 className="text-sm font-bold text-gray-800">

          {title}

        </h3>


        <button
          type="button"
          onClick={() =>
            addArrayItem(field)
          }
          className="flex items-center gap-1 text-sm text-purple-600"
        >

          <Plus size={15} />

          Add

        </button>

      </div>


      <div className="space-y-2">

        {values.map(
          (value, index) => (

            <div
              key={index}
              className="flex gap-2"
            >

              <input
                value={value}
                onChange={(e) =>
                  handleArrayChange(
                    field,
                    index,
                    e.target.value
                  )
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-purple-500"
              />


              <button
                type="button"
                onClick={() =>
                  removeArrayItem(
                    field,
                    index
                  )
                }
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >

                <Trash2 size={17} />

              </button>

            </div>

          )
        )}

      </div>

    </div>

  );

}


// =====================================================
// DETAIL ITEM
// =====================================================

function DetailItem({
  label,
  value
}) {

  return (

    <div>

      <p className="text-[12px] text-[#8A8A98] mb-1">

        {label}

      </p>

      <p className="text-[14px] font-medium text-[#171717]">

        {value || "-"}

      </p>

    </div>

  );

}


// =====================================================
// INTEREST TAG
// =====================================================

function Tag({
  text,
  type
}) {

  const styles =
    type === "pink"

      ? "bg-[#FFF1F7] border-[#F6C9DE] text-[#D92D72]"

      : "bg-[#F7F0FF] border-[#E0C8FF] text-[#8035E8]";


  return (

    <span
      className={`px-3 py-1.5 rounded-full border text-[14px] font-medium ${styles}`}
    >

      {text}

    </span>

  );

}


// =====================================================
// GOAL TAG
// =====================================================

function IconTag({
  text
}) {

  return (

    <div className="flex items-center px-3 py-1.5 rounded-full border bg-[#F7F0FF] border-[#E0C8FF] text-[#8035E8] text-[14px] font-medium">

      <Target
        size={16}
        className="mr-2"
      />

      {text}

    </div>

  );

}


export default AccountDetails;