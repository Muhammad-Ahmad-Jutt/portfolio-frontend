import { useState } from "react";
import axios from "axios";

export default function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    active_date: "",
    active_till: "",
    job_category_id: "",
    company: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const token = localStorage.getItem("token");
      const token = localStorage.getItem("token");
      const res = await fetch("/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }).then((r) => r.json());

      if (res.data.success) {
        setStatus("Job created successfully!");
      }
    } catch (err) {
      setStatus("Error creating job. Check required fields.");
    }
  };

  return (
    <div className="job-container max-w-xl mx-auto p-5">
      <p className="job-status text-center text-green-600 mb-3">{status}</p>

      <form onSubmit={handleSubmit} className="job-form space-y-4 bg-white p-6 shadow rounded-xl">
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
          <label className="block mb-1 font-semibold">Job Category ID</label>
          <input
            type="number"
            name="job_category_id"
            value={formData.job_category_id}
            onChange={handleChange}
            className="job-input w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="job-submit bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Create Job
        </button>
      </form>
    </div>
  );
}
