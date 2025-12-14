
// this complete file is written with the help of ai and link is mentioned in the commit 
// i have made several updated to it as per my requirements
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function SuperUserDashboard() {
const { token } = useContext(AuthContext);
const [dashboardData, setDashboardData] = useState();
const API_URL = process.env.REACT_APP_FLASK_SERVER
useEffect(() => {

async function fetchdata() {

const res = await fetch(`${API_URL}/api/v1/view_total`, {
method: "GET",
headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
},
});

const data = await res.json();
if (data.success) setDashboardData(data.data);
}


fetchdata();
}, [token, API_URL]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      <h1 className="text-4xl font-extrabold mb-6">Super User Dashboard</h1>

      <div className="flex space-x-6">
        <button className="bg-blue-500 text-white text-2xl font-bold px-8 py-6 rounded-lg shadow-lg hover:bg-blue-600 transition">
          Jobs: {dashboardData?dashboardData.jobs_count:""}
        </button>

        <button className="bg-green-500 text-white text-2xl font-bold px-8 py-6 rounded-lg shadow-lg hover:bg-green-600 transition">
          Users: {dashboardData?dashboardData.user_registered:""}
        </button>

        <button className="bg-purple-500 text-white text-2xl font-bold px-8 py-6 rounded-lg shadow-lg hover:bg-purple-600 transition">
          Applications: {dashboardData?dashboardData.applications_received:""}
        </button>
      </div>

    </div>
  );
}
