import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
export default function SignIn (){
  const API_URL = process.env.REACT_APP_FLASK_SERVER

    // state for the email and password
    const [email, setEmail]= useState("")
    const [password, setPassword]=useState("")
    const {login,logout} = useContext(AuthContext)
    const [error, setError] = useState(""); 
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError(""); 
        const payload = {
          email:email,
          password:password

        }

        const res = await fetch(`${API_URL}/api/v1/auth/sign-in`,{
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(payload)
        })
        const data = await res.json(); 
if (data.success === true) {
  toast.success(data.message);
  login(data.access_token, data.user);
  if (data.user.role === 'job_seeker') {
    navigate(`/job_seeker_dashboard`);
  } else if (data.user.role === 'recruiter') {
    navigate('/recruiter_dashboard');
  } else if (data.user.role === "super_user") {
    navigate('/super_user');
  } else {
    logout();
  }
} else {
  setError(data.message); 
}
    }
    return (
    <> 
 
    <form onSubmit={handleSubmit}>
        <h3>Hi! from Job Portal</h3>

        <br />
      <label>
        Email: <input name="emailInput" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </label>
      <br />
        <label>
        Password: <input name="passwordInput" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </label>
      <br />
      <button type="submit">Sign In</button>
      {error && <h5 style={{ color: "red" }}>{error}</h5>} {/* Conditional error */}
          <br />
      <label>Didn't have an Account?
        <button type="button" className="signupButton" onClick={()=>navigate(`/sign-up`)}>
          Sign up here
        </button>
      </label>

    </form>

    </>)
}