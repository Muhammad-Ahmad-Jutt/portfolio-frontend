import { useState, useContext , useEffect} from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
export default function SignIn (){
  const API_URL = process.env.REACT_APP_FLASK_SERVER

    // state for the email and password
    const [email, setEmail]= useState("")
    const [password, setPassword]=useState("")
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
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
        if (data.user){
          setUser(data.user)
        }
        if (data.user.role==='job_seeker'){
          navigate(`/job_seeker_dashboard`)
        }
    };

    return (<form onSubmit={handleSubmit}>
        <h3>heelow from sign in</h3>
        <br />
      <label>
        email: <input name="emailInput" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </label>
      <br />
        <label>
        Password: <input name="passwordInput" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>)
}