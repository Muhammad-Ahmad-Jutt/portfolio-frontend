import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
// # this page is create with help of ai :https://chatgpt.com/share/693ea927-c65c-8009-b30c-a4b5c910a11c
export default function ViewUsersData() {
  const { token } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_FLASK_SERVER;

  const [loading, setLoading] = useState(true);
  const [recruiters, setRecruiters] = useState([]);   // ✅ defined
  const [jobSeekers, setJobSeekers] = useState([]);   // ✅ defined

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${API_URL}/api/v1/get_all_users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        console.log(result);

        // ✅ SAFE ACCESS
        setRecruiters(result?.data?.recruiters || []);
        setJobSeekers(result?.data?.job_seekers || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [token, API_URL]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">

      {/* Recruiters */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recruiters</h2>

        {recruiters.length === 0 ? (
          <p className="text-gray-500">No recruiters found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {recruiters.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>

      {/* Job Seekers */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Job Seekers</h2>

        {jobSeekers.length === 0 ? (
          <p className="text-gray-500">No job seekers found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {jobSeekers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

/* ✅ Card Component (same file) */
function UserCard({ user }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">
          {user.firstname} {user.lastname}
        </h3>

        <p className="text-sm text-gray-600">{user.email}</p>

        <p className="text-xs mt-1">
          Role: <span className="font-medium">{user.roles.join(", ")}</span>
        </p>

        <p className="text-xs text-gray-500">
          Created: {new Date(user.account_created).toLocaleDateString()}
        </p>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          user.blocked
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {user.blocked ? "Blocked" : "Active"}
      </span>
    </div>
  );
}
