// this is also ai generated and chat link https://chatgpt.com/c/693ad9b3-6f40-8329-b0b3-c6fa40f71b2f
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../job_seeker/Job_Details";
import { AuthContext } from "../../../context/AuthContext";
import "./Job.css"; // <-- CSS file

export default function ViewJobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, logout } = useContext(AuthContext);
    const [job, setJob] = useState(null);

    useEffect(() => {
        if (!token) {
            logout();
            navigate("/sign-in");
            return;
        }

        const fetchJobDetails = async () => {
            try {
                const res = await fetch(`${API_URL}/api/v1/jobs/job/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setJob(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobDetails();
    }, [id, token, logout, navigate]);

    const deleteJob = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${API_URL}/api/v1/jobs/job/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await res.json();
            console.log(result);

            if (res.ok) {
                alert("Job deleted successfully!");
                navigate("/jobs");
            } else {
                alert(result.message || "Unable to delete job.");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong.");
        }
    };

    const editJob = () => {
        navigate(`/edit_job/${id}`);
    };

    if (!job) return <p>Loading...</p>;

    return (
        <div className="job-container">
            <h1 className="job-title">{job.title}</h1>

            <div className="job-details">
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Category:</strong> {job.job_category}</p>
                <p><strong>Active:</strong> {job.active ? "Yes" : "No"}</p>
                <p><strong>Accepting Applicants:</strong> {job.accepting_applicant ? "Yes" : "No"}</p>
                <p><strong>Posted Date:</strong> {job.posted_date}</p>
                <p><strong>Posted By:</strong> {job.user}</p>
                <p><strong>Employer User ID:</strong> {job.employer_user_id}</p>
            </div>

            <div className="btn-group">
                <button className="btn edit-btn" onClick={editJob}>
                    Edit Job
                </button>

                <button className="btn delete-btn" onClick={deleteJob}>
                    Delete Job
                </button>
            </div>
        </div>
    );
}
