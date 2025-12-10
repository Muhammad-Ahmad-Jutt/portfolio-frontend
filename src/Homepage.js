import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Job Portal</h1>
      <div className="button-group">
        <button className="btn" onClick={() => navigate(`/sign-in`)}>
          Sign In
        </button>
        <button className="btn" onClick={() => navigate(`/sign-up`)}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
