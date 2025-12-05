import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header-footer/header'
import Footer from "./components/header-footer/footer";
import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";
function App() {
  return (
    <BrowserRouter>
      <Header />   {/* Always visible */}

      <Routes>
        <Route path="/" element={<h1>homepage</h1>} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>

      <Footer />   
    </BrowserRouter>
  );
}

export default App;
