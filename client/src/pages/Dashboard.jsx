import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API_URL from "../config/api";

import Navbar from "../Components/Dashboard/Navbar";
import Sidebar from "../Components/Dashboard/Sidebar";
import StatCards from "../Components/Dashboard/StatCards";
import UpcomingExam from "../Components/Dashboard/UpcomingExam";
import PsychometricSummary from "../Components/Dashboard/PsychometricSummary";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const childId = localStorage.getItem("childId")||
                sessionStorage.getItem("childId");

                const token =
                    localStorage.getItem("token") ||
                    sessionStorage.getItem("token");

                if (!childId) {
                    setError("Child not found.");
                    navigate("/add-child");
                    return;
                }

                if (!token) {
                    setError("User not authenticated.");
                    return;
                }

                console.log("Child ID:", childId);

                const response = await fetch(
                    `${API_URL}/dashboard/overview/${childId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                console.log("Dashboard Response:", data);

                if (!response.ok) {
                    throw new Error(
                        data.message || "Unable to load dashboard"
                    );
                }

                setDashboardData(data.data);

            } catch (err) {

                console.error("Dashboard Error:", err);

                setError(
                    err.message || "Unable to load dashboard"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchDashboard();

    }, [navigate]);


    // ============================
    // LOADING
    // ============================

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">
                    Loading dashboard...
                </p>
            </div>
        );
    }


    // ============================
    // ERROR
    // ============================

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }


    // ============================
    // DASHBOARD
    // ============================

    return (

        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <div className="flex">

                {/* SIDEBAR */}

                <Sidebar />


                {/* MAIN CONTENT */}

                <main className="flex-1 p-6">

                    {/* STAT CARDS */}

                    <StatCards
                        stats={dashboardData?.stats}
                    />


                    {/* UPCOMING EXAM + PSYCHOMETRIC */}

                    

                        <UpcomingExam
                            exams={dashboardData?.upcomingExams || []}
                            childId={dashboardData?.child?.id}
                        />

                        <PsychometricSummary
                            data={dashboardData?.psychometricSummary}
                        />

                    

                </main>

            </div>

        </div>

    );
}

export default Dashboard;