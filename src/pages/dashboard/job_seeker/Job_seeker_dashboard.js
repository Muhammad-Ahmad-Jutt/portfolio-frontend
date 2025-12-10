import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function JobsSeekerDashboard() {
  const API_URL = process.env.REACT_APP_FLASK_SERVER;
  const { token, user , logout} = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate()
  const [error, seterror]=useState("")
  useEffect(() => {
    if (!token) {
      logout()
      navigate(`/sign-in`);
      return ;
    } ;

      const fetchJobs = async () => {
        try {
          const res = await fetch(`${API_URL}/api/v1/jobs/job`, {
            method: "GET",
            headers: { 
              "Content-Type": "application/json",
              "Authorization":`Bearer ${token}`
            },
          });
          const data = await res.json();
          setJobs(data); 

        } catch (error) {
          seterror(error)
          console.error("Error fetching jobs:", error);
        }
      };

      fetchJobs();
    
  }, [token, API_URL, navigate,user, logout]);

  if (!user) return <p>Please log in to see jobs.</p>;
  if (!jobs.length) return <p>Loading jobs...</p>;

  return (
    <>
      <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Select a Job</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {jobs.map((job, index) => (
          <button
            key={index}
            className="
              w-full p-4 rounded-xl border 
              border-gray-300 bg-white shadow-sm 
              hover:shadow-md hover:border-blue-500 
              transition text-left
            "
            onClick={() => navigate(`/job_details/${job.id}`)}
          >
            {job.title}
            <br />
            <p>{job.posted_date?job.posted_date: ""}</p>
            <p>{job.job_category?job.job_category:""}</p>
            <p>{job.company_name?job.company_name:""}</p>
          </button>
        ))}
      </div>

    </div>
      {error && <h5 style={{ color: "red" }}>{error}</h5>} {/* Conditional error */}
      </>
  );
}
