import React from "react";

function Dashboard() {

    const user =JSON.parse(
        localStorage.getItem("user") ||
        sessionStorage.getItem("user")
    );
    return(
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold">
                Welcome
            </h1>
            <h2 className="mt-5 text-2xl">
                {user?.fullName}
            </h2>

            <p className="mt-3">
                {user?.email}
            </p>

            <button
    className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg"
    onClick={() => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        window.location.href = "/login";

    }}
>
    Logout
</button>

        </div>
    );
}

export default Dashboard;