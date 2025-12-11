import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./Style.css"
const API_URL = process.env.REACT_APP_FLASK_SERVER;
export default function JobApplicationDetail (){
    const {id} = useParams()
    const { token, user, logout } = useContext(AuthContext);
    const [job, setJobdata]=useState(null)
    const [loading, setLoading]=useState(true)
    const [error, seterror]=useState()
    const navigate = useNavigate()

    useEffect(()=>{
        if (!token){
          logout()
            navigate('/sign-in')
            return
        }
        const fetchjobapplicationdetails = async()=>{
            try{
                const res = await fetch(`${API_URL}/api/v1/jobs/job/applicaton/${id}`,{
                    headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }});
               const  data = await res.json()
            setJobdata(data)
            
            
            }
            catch(error){
                seterror(error)
            }finally{
                setLoading(false)
            }


        }

fetchjobapplicationdetails()
    },[id,token,navigate,logout])
    if (!user) return <p>Please log in to see jobs.</p>;// these stopper are ritten with the help of ai
    if (!job)  return <p>Loading job Details</p>
    if (loading) return <p>Loading job details...</p>;

return (<>
  <div className="flex w-full gap-6 h-full">
    <div className="job-card w-1/2 p-4 bg-white rounded-lg shadow-md text-left">
      <h2 className="job-title text-2xl font-bold">{job.title}</h2>

      <p className="job-category">
        <span className="font-semibold">Category:</span> {job.job_category}
      </p>

      <p className="job-posted-date">
        <span className="font-semibold">Posted on:</span> {job.posted_date}
      </p>

      <p className="job-posted-date">
        <span className="font-semibold">Applied on:</span> {job.applied_date}
      </p>
      <p className="job-status">
        <span className="font-semibold">Status:</span> {job.active ? "Active" : "Inactive"} &nbsp;|&nbsp;
        <span className="accepting">
          {job.accepting_applicant ? "Accepting Applicants" : "Not Accepting"}
        </span>
      </p>

      <p className="job-user-id">
        <span className="font-semibold">Posted by user :</span> {job.user}
      </p>
      <p className="job-user-id">
        <span className="font-semibold">Application Status :</span> {job.application_status}
      </p>

    </div>
    <div className="job-card w-1/2 p-4 bg-white rounded-lg shadow-md text-left">
      <h2 className="text-2xl font-bold">Description</h2>
      <p className="job-description">{job.description}</p>
    </div>
          {error ? <p className="text-red-600">{error}</p> : ""}
  </div>

    
</>
);

}