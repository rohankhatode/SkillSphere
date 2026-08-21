import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function SelectChild() {
  const navigate = useNavigate();

  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      setIsLoading(true);
      setError("");

      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token) {
        navigate("/Login");
        return;
      }

      const response = await fetch(
        `${API_URL}/child/my-children`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Select Child - My Children:", data);

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to load children."
        );
        return;
      }

      if (
        !data.children ||
        data.children.length === 0
      ) {
        navigate("/Welcome");
        return;
      }

      setChildren(data.children);
    } catch (error) {
      console.error(
        "Fetch Children Error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChild = (child) => {
  console.log("SELECTED CHILD:", child);
  console.log("SELECTED CHILD ID:", child._id);

  const rememberMe =
    localStorage.getItem("token") !== null;

  if (rememberMe) {
    localStorage.setItem("childId", child._id);
    sessionStorage.removeItem("childId");
  } else {
    sessionStorage.setItem("childId", child._id);
    localStorage.removeItem("childId");
  }

  console.log(
    "localStorage childId:",
    localStorage.getItem("childId")
  );

  console.log(
    "sessionStorage childId:",
    sessionStorage.getItem("childId")
  );

  navigate("/dashboard");
};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading children...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div className="w-full max-w-4xl">

        <div className="text-center mb-10">

          <h1 className="text-3xl font-bold text-black">
            Select a Child
          </h1>

          <p className="mt-3 text-gray-500">
            Choose the child whose profile you
            want to manage.
          </p>

        </div>

        {error && (
          <p className="text-center text-red-600 mb-6">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {children.map((child) => (

            <button
              key={child._id}
              type="button"
              onClick={() =>
                handleSelectChild(child)
              }
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left hover:border-purple-500 hover:shadow-lg transition"
            >

              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-5">

                {child.profileImage ? (
                  <img
                    src={child.profileImage}
                    alt={child.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-purple-600">
                    {child.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </span>
                )}

              </div>

              <h2 className="text-xl font-semibold text-center text-black">
                {child.name}
              </h2>

              {child.age && (
                <p className="text-center text-gray-500 mt-2">
                  Age {child.age}
                </p>
              )}

              <div className="mt-5 w-full py-2.5 rounded-full bg-purple-600 text-white text-center font-medium">
                Select
              </div>

            </button>

          ))}

        </div>

      </div>

    </div>
  );
}

export default SelectChild;