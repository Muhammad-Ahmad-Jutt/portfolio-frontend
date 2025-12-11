
// this complete file is written with the help of ai and link is mentioned in the commit 
// i have made several updated to it as per my requirements
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyJobs() {
const API_URL = process.env.REACT_APP_FLASK_SERVER
const { token } = useContext(AuthContext);
const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
const navigate=useNavigate()

useEffect(() => {
async function fetchJobs() {

const res = await fetch(`${API_URL}/api/v1/jobs/job/jobs_active`, {
method: "GET",
headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
},
});


const data = await res.json();
if (data.success) setJobs(data.jobs);
setLoading(false);
}


fetchJobs();
}, [token, API_URL]);


if (loading) return <p className="text-center">Loading...</p>;


return (
<div className="myjobs-container max-w-2xl mx-auto p-5">
<h2 className="text-2xl font-bold mb-4">Live Jobs</h2>
{jobs.length === 0 && <p>No jobs created yet.</p>}


<div className="space-y-4">
{jobs.map((job, index) => (
    <button
     className="
              w-full p-4 rounded-xl border 
              border-gray-300 bg-white shadow-sm 
              hover:shadow-md hover:border-blue-500 
              transition text-left
            "
    key={index}
    onClick={() => navigate(`/view_job_details/${job.id}`)}
    >
<div key={job.id} className="p-4 border rounded shadow">
<h3 className="text-xl font-semibold">{job.title}</h3>
<p className="text-gray-600">{job.company}</p>
<p className="text-sm mt-1">Active: {job.active_date} → {job.active_till}</p>
</div>
</button>


))
}
</div>
</div>
);
}