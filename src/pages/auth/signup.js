import { useState } from "react";
import "./Style.css"
const API_URL = process.env.REACT_APP_FLASK_SERVER
export default function Signup (){


  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [role, setRole] = useState("job_seeker"); 
  const [phoneNo, setPhoneNo] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [empStatus, setEmpStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstname,
      lastname,
      email,
      password,
      recovery_email: recoveryEmail,
      role,
      phone_no: phoneNo,
      work_email: workEmail,
      gender,
      dob,
      emp_status: empStatus,
    };
    const res = await fetch(`${API_URL}/api/v1/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data)
  };


    return (
          <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <br />

      <label>
        First Name:{" "}
        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      </label>
      <br />

      <label>
        Last Name:{" "}
        <input value={lastname} onChange={(e) => setLastname(e.target.value)} />
      </label>
      <br />

      <label>
        Email:{" "}
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />

      <label>
        Password:{" "}
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />

      <label>
        Recovery Email:{" "}
        <input value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)} />
      </label>
      <br />

      <label>
        Role:{" "}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="job_seeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
      </label>
      <br />

      <label>
        Phone No:{" "}
        <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
      </label>
      <br />

      <label>
        Work Email:{" "}
        <input value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} />
      </label>
      <br />

      <label>
        gender:{" "}
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <br />

      <label>
        Date of Birth:{" "}
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </label>
      <br />

      <label>
        Employment Status:{" "}
        <input value={empStatus} onChange={(e) => setEmpStatus(e.target.value)} />
      </label>
      <br />

      <button type="submit">Sign Up</button>
    </form>
    );
}