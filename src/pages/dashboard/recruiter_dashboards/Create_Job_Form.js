import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function JobForm() {
  const { user, token } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_FLASK_SERVER;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (user && user.role !== "recruiter") navigate("/");
  }, [user, navigate]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/jobs/job_category`);
      const data = await res.json();


      if (Array.isArray(data)) {
        setCategories(data);         
      }
    } catch (error) {
      console.error("Could not fetch categories", error);
    }
  };

  fetchCategories();
}, [API_URL]);

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

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch(`${API_URL}/api/v1/jobs/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Job created successfully!");
        toast.success(data.message)
      } else {
        setStatus(data.error || "Failed to create job.");
        toast.success(data.message)
      }
    } catch (err) {
      setStatus("Server error while creating job.");
    }
  };

  return (
    <div className="job-container max-w-xl mx-auto p-5">
      <p className="job-status text-center text-green-600 mb-3">{status}</p>

      <form
        onSubmit={handleSubmit}
        className="job-form space-y-4 bg-white p-6 shadow rounded-xl"
      >
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
          ></textarea>
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

        <div className="job-field">
          <label className="block mb-1 font-semibold">Job Category</label>
        <select
        name="job_category_id"
        value={formData.job_category_id}
        onChange={handleChange}
        >
        {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
            {cat.category_name}
            </option>
        ))}
        </select>
        </div>

        {/* Active checkbox */}
        <div className="job-field flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
          <label>Active</label>
        </div>

        {/* Accepting applicants checkbox */}
        <div className="job-field flex items-center space-x-2">
          <input
            type="checkbox"
            name="accepting_applicant"
            checked={formData.accepting_applicant}
            onChange={handleChange}
          />
          <label>Accepting Applicants</label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="job-submit bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
