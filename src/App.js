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
import RecruiterDashboard from "./pages/dashboard/recruiter_dashboards/Recruiter_dasboard";
import RecruiterJobs from "./pages/dashboard/recruiter_dashboards/RecruiterJobs";
import CreateJobs from "./pages/dashboard/recruiter_dashboards/Create_Job_Form";
import ViewJobDetails from "./pages/dashboard/recruiter_dashboards/View_job_details";
import EditJobForm from "./pages/dashboard/recruiter_dashboards/EditJob";
import ViewJobApplications from "./pages/dashboard/recruiter_dashboards/ViewJobApplications";
import ViewJobApplicationsDetails from "./pages/dashboard/recruiter_dashboards/ViewJobApplicationsDetails";
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
        <Route path='/recruiter_dashboard' element={<RecruiterDashboard />}/>
        <Route path="/my_jobs" element={<RecruiterJobs />}/>
        <Route path="/create_job_form" element={< CreateJobs />} />
        <Route path="/view_job_details/:id" element={<ViewJobDetails />} />
        <Route path="/edit_job/:id" element= {<EditJobForm />} />
        <Route path="/view_job_applications" element={<ViewJobApplications />} />
        <Route path="/view_job_application_details/:id" element={<ViewJobApplicationsDetails />} />
      </Routes>

      <Footer />   
    </BrowserRouter>
  );
}

export default App;
