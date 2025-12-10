import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import "./Style.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  // const location=useLocation();
  const navigate = useNavigate();
  const  homepage = ()=>{
    if (user && user.role ==="job_seeker"){
      navigate(`/job_seeker_dashboard`)
  }


  }
  return (
    <header className="header">
      <div className="left">
        <h2 onClick={homepage}>Job Portal</h2>
      </div>

      <div className="right">

        {user && user.role === "job_seeker" && (<>
          <button className="navBtn" onClick={()=>navigate(`/my_jobs`)}>My Jobs</button>
          <button className="navBtn" onClick={()=>navigate(`/job_seeker_dashboard`)}>Jobs</button>
</>
        )}

        {user ? (
          <>
            <span className="greeting">Hello, {user.firstname}</span>

            <button className="logoutButton" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          // <span className="signinText">Please sign in</span>
          <button className="Sign up Button">Sign up</button>
        )}
      </div>
    </header>
  );
}
