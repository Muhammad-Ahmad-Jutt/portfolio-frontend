import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../job_seeker/Job_Details";
import { AuthContext } from "../../../context/AuthContext";
import "./Job.css";
// this file is generated from chatgpt link is https://chatgpt.com/c/693d89b7-8d7c-8327-b1f5-d874075f4566

export default function ViewJobApplicationsDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState(null);

  // Fetch Job Details
  useEffect(() => {
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
  }, [id, token]);

  // Fetch Applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/jobs/job/job_applications/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [id, token]);

  // Update Applicant Status
  const updateApplicantStatus = async (applicantId, newStatus) => {
    try {
      const res = await fetch(
        `${API_URL}/api/v1/jobs/job_applications/${applicantId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        // Update state locally
        setApplications((prev) =>
          prev.map((a) =>
            a.id === applicantId ? { ...a, application_status: newStatus } : a
          )
        );
      } else {
        const error = await res.json();
        alert(error.message || "Failed to update status");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Applicants on Left */}
      <div className="md:w-1/2 space-y-4">
        <h3 className="text-xl font-semibold mb-2">Applicants</h3>
        {!applications ? (
          <p>Loading applicants...</p>
        ) : applications.length > 0 ? (
          applications.map((applicant) => (
            <div
              key={applicant.id}
              className="border rounded p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div className="space-y-1">
                <p className="font-medium">{applicant.applicant_name}</p>
                <p className="text-sm text-gray-500">
                  Applied on:{" "}
                  {new Date(applicant.applied_date).toLocaleDateString()}
                </p>
                {applicant.cv_link && (
                  <a
                    href={applicant.cv_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View CV
                  </a>
                )}
              </div>

              {/* Status Update */}
              <div>
                <select
                  value={applicant.application_status}
                  onChange={(e) =>
                    updateApplicantStatus(applicant.id, e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No applicants yet.</p>
        )}
      </div>

      {/* Job Details on Right */}
      <div className="md:w-1/2 bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p>
          <strong>Description:</strong> {job.description ?? "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {job.job_category ?? "N/A"}
        </p>
        <p>
          <strong>Active:</strong> {job.active ? "Yes" : "No"}
        </p>
        <p>
          <strong>Accepting Applicants:</strong>{" "}
          {job.accepting_applicant ? "Yes" : "No"}
        </p>
        <p>
          <strong>Posted Date:</strong> {job.posted_date ?? "N/A"}
        </p>
        <p>
          <strong>Posted By:</strong> {job.user ?? "N/A"}
        </p>
        <p>
          <strong>No of Applications Received:</strong>{" "}
          {job.applications_count ?? 0}
        </p>
      </div>
    </div>
  );
}