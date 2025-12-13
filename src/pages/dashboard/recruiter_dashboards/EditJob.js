// This is ai generated so the chat links is https://chatgpt.com/c/693ad9b3-6f40-8329-b0b3-c6fa40f71b2f
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditJobForm() {
  const { user, token, authLoading } = useContext(AuthContext);
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_FLASK_SERVER;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Loading job...");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    active_date: "",
    active_till: "",
    job_category_id: "",
    company: "",
    active: true,
    accepting_applicant: true,
  });

useEffect(() => {
  if (authLoading) return; // ⏳ WAIT

  console.log("User:", user);

  if (!user) {
    navigate("/sign-in");
    return;
  }

  if (user.role !== "recruiter") {
    navigate("/");
  }
}, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/jobs/job_category`);
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      } catch (err) {
        console.error("Could not fetch categories", err);
      }
    };

    fetchCategories();
  }, [API_URL]);

  // Fetch job details for editing
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/jobs/job/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const jobData = data.job || data;

        if (!jobData.id) {
          setStatus("Job not found.");
          setLoading(false);
          return;
        }
// const formattedActiveDate = activeDate.toISOString().split("T")[0]; this is is copied fromt he same chat

        setFormData({
          title: jobData.title || "",
          description: jobData.description || "",
          active_date: jobData.active_date
            ? new Date(jobData.active_date).toISOString().split("T")[0]
            : "",

          active_till: jobData.active_till
            ? new Date(jobData.active_till).toISOString().split("T")[0]
            : "",
          job_category_id: jobData.job_category_id || "",
          company: jobData.company || "",
          active: jobData.active ?? true,
          accepting_applicant: jobData.accepting_applicant ?? true,
        });

        setStatus("");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setStatus("Error loading job.");
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, API_URL, token]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit updated job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Updating job...");

    try {
      const res = await fetch(`${API_URL}/api/v1/jobs/job/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Job updated successfully!");
        setTimeout(() => navigate(`/view_job_details/${id}`), 800);
      } else {
        setStatus(data.error || "Failed to update job.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error while updating job.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading job...</p>;

  return (
    <div className="job-container max-w-xl mx-auto p-5">
      <p className="job-status text-center text-green-600 mb-3">{status}</p>

      <form
        onSubmit={handleSubmit}
        className="job-form space-y-4 bg-white p-6 shadow rounded-xl"
      >
        <h2 className="text-xl font-bold text-center mb-4">Edit Job</h2>

        {/* Job Title */}
        <div className="job-field">
          <label className="block mb-1 font-semibold">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="job-input w-full p-2 border rounded"
            required
          />
        </div>

        {/* Company */}
        <div className="job-field">
          <label className="block mb-1 font-semibold">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="job-input w-full p-2 border rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="job-field">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="job-input w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        {/* Active Date */}
        <div className="job-field">
          <label className="block mb-1 font-semibold">Active Date</label>
          <input
            type="date"
            name="active_date"
            value={formData.active_date}
            onChange={handleChange}
            className="job-input w-full p-2 border rounded"
            required
          />
        </div>

        {/* Active Till */}
        <div className="job-field">
          <label className="block mb-1 font-semibold">Active Till</label>
          <input
            type="date"
            name="active_till"
            value={formData.active_till}
            onChange={handleChange}
            className="job-input w-full p-2 border rounded"
            required
          />
        </div>

        {/* Job Category */}
        <div className="job-field">
          <label className="block mb-1 font-semibold">Job Category</label>
          <select
            name="job_category_id"
            value={formData.job_category_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Active Checkbox */}
        <div className="job-field flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
          <label>Active</label>
        </div>

        {/* Accepting Applicants Checkbox */}
        <div className="job-field flex items-center space-x-2">
          <input
            type="checkbox"
            name="accepting_applicant"
            checked={formData.accepting_applicant}
            onChange={handleChange}
          />
          <label>Accepting Applicants</label>
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="job-submit bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
