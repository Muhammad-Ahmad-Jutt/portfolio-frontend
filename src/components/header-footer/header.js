import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
export default function Header(){
      const {user, logout} = useContext(AuthContext)
    return(
        

    <header>
      {user ? (
        <>
          <h4>Hello, {user.firstname}</h4>
          {user.role === "job_seeker" ? (
            <h6>You are here for finding jobs</h6>
          ) : user.role === "recruiter" ? (
            <h6>You are here for finding people</h6>
          ) : null}
          <button className="logoutButton" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <h4>Please sign in</h4>
      )}
    </header>
    )
}

