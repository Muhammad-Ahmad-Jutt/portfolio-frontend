import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
export default function Header(){
      const {user} = useContext(AuthContext)
    return(
        
    <>
      {user?(<h4>hello, {user.firstname}</h4>):(<h4>please sin in </h4>)}
{user ? (
  user.role === "job_seeker" ? (
    <h6>You are here for finding jobs</h6>
  ) : user.role === "recruiter" ? (
    <h6>You are here for finding people</h6>
  ) : null
) : null}

    </>
    )
}

