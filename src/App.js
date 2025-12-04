import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header-footer/header'
import Footer from "./components/header-footer/footer";
import Signin from "./pages/auth/signin";

function App() {
  return (
    <BrowserRouter>
      <Header />   {/* Always visible */}

      <Routes>
        <Route path="/" element={<h1>homepage</h1>} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

      <Footer />   
    </BrowserRouter>
  );
}

export default App;
