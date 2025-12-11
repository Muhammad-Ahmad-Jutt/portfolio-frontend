import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./Style.css"
export const API_URL = process.env.REACT_APP_FLASK_SERVER;
export default function JobDetail (){
    const {id} = useParams()
    const { token, user, logout } = useContext(AuthContext);
    const [job, setJobdata]=useState(null)
    const [loading, setLoading]=useState(true)
    const [error, seterror]=useState()
    const navigate = useNavigate()
    const[show, setshow]=useState(false)
    const[applystatus, setstatus] = useState(false)
    const applyjob = ()=>{
      if (show===true){
      setshow(false)
      setstatus(false)
    }else{
      setshow(true)
    }
  }
  const uploadcv = ()=>{
    const payload = {
      job_id:job.id,
    }
    const applytojob = async()=>{
    try{
        const res = await fetch(`${API_URL}/api/v1/jobs/job/apply`,{
          method:'POST',
          headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                },
        body: JSON.stringify(payload)
  }
  );
    const data = await res.json()
      if (data.success===true){
                setstatus(data.message)

      }else{
        setstatus(data.message)
      }
    }
    catch(error){
      seterror(error)
    }



  }
  applytojob();
}
    useEffect(()=>{
        if (!token){
          logout()
            navigate('/sign-in')
            return
        }
        const fetchjobdetails = async()=>{
            try{
                const res = await fetch(`${API_URL}/api/v1/jobs/job/${id}`,{
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

fetchjobdetails()
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

      <p className="job-status">
        <span className="font-semibold">Status:</span> {job.active ? "Active" : "Inactive"} &nbsp;|&nbsp;
        <span className="accepting">
          {job.accepting_applicant ? "Accepting Applicants" : "Not Accepting"}
        </span>
      </p>

      <p className="job-user-id">
        <span className="font-semibold">Posted by user :</span> {job.user}
      </p>

      <button className="apply-btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={applyjob}>
        Apply Now
      </button>

    </div>
    <div className="job-card w-1/2 p-4 bg-white rounded-lg shadow-md text-left">
      <h2 className="text-2xl font-bold">Description</h2>
      <p className="job-description">{job.description}</p>
    </div>
          {error ? <p className="text-red-600">{error}</p> : ""}
  </div>
    <div className="job-card w-1/2 p-4 bg-white rounded-lg shadow-md text-center">    
    {show && <div>
      
      <label> Please upload your cv 
      <input type="file" className="custom-file-input" />
      </label>
      <button className="upload-btn"
      onClick={uploadcv}
      >upload</button>
      { applystatus?applystatus:""}
      </div>}
    </div>
    
</>
);

}