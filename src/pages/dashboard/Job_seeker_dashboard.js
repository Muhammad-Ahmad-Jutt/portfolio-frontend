import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function JobsSeekerDashboard() {
  const API_URL = process.env.REACT_APP_FLASK_SERVER;
  const { token, user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate(`/sign-in`);
      return ;
    } ;
      console.log('----------------------------->this is hte user',user)

      const fetchJobs = async () => {
        try {
          const res = await fetch(`${API_URL}/api/v1/jobs/job`, {
            method: "GET",
            headers: { 
              "Content-Type": "application/json",
              "Authorization":`Bearer ${token}`
            },
          });
          console.log('You have made it throghout the nevigate')
          const data = await res.json();
          setJobs(data); 
          console.log(data);

        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };

      fetchJobs();
    
  }, [token, API_URL, navigate,user]);

  if (!user) return <p>Please log in to see jobs.</p>;
  if (!jobs.length) return <p>Loading jobs...</p>;

  return (
    <ul>
      {jobs.map((job, index) => (
        <li key={index}>{job.title || JSON.stringify(job)}</li>
      ))}
    </ul>
  );
}
