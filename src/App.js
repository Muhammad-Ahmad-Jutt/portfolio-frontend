import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header-footer/header'
import Footer from "./components/header-footer/footer";
import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";
import JobsSeekerDashboard from "./pages/dashboard/Job_seeker_dashboard";
import Myjobs from "./pages/dashboard/Job_seeker_myjobs"
import JobDetail from "./pages/dashboard/Job_Details";
function App() {
  return (
    <BrowserRouter>
      <Header />   

      <Routes>
        <Route path="/" element={<h1>homepage</h1>} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/job_seeker_dashboard" element={<JobsSeekerDashboard />} />
        <Route path="/my_jobs" element={<Myjobs />}></Route>
        <Route path="/job_details/:id" element={<JobDetail />} />
      </Routes>

      <Footer />   
    </BrowserRouter>
  );
}

export default App;
