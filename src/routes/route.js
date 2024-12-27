import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Home from "../pages/home";
import Footer from "../components/footer";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default RoutesApp;