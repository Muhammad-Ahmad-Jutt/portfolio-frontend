import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header-footer/header'
import Footer from "./components/header-footer/footer";
import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";
import JobsSeekerDashboard from "./pages/dashboard/job_seeker/Job_seeker_dashboard";
import Myjobs from "./pages/dashboard/job_seeker/Job_seeker_myjobs"
import JobDetail from "./pages/dashboard/job_seeker/Job_Details";
import JobApplicationDetail from "./pages/dashboard/job_seeker/Job_Application_Details";
import Homepage from "./Homepage";
function App() {
  return (
    <BrowserRouter>
      <Header />   

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/job_seeker_dashboard" element={<JobsSeekerDashboard />} />
        <Route path="/my-jobs" element={<Myjobs />}></Route>
        <Route path="/job_details/:id" element={<JobDetail />} />
        <Route path="/job-application/:id" element={<JobApplicationDetail />} />
      </Routes>

      <Footer />   
    </BrowserRouter>
  );
}

export default App;
