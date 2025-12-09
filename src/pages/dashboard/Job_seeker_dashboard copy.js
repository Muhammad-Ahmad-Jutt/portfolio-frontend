export default function JobGrid() {
  const jobs = [
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "DevOps Engineer",
    "QA Engineer",
    "UI/UX Designer",
    "Project Manager",
    "Cloud Engineer"
  ];

  return (
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
            onClick={() => console.log("Selected:", job)}
          >
            {job}
          </button>
        ))}
      </div>
    </div>
  );
}
