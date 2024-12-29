import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../layout/header";
import Home from "../pages/home";
import Footer from "../layout/footer";
import Favoritos from "../pages/favoritos";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/favoritos" element={ <Favoritos /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default RoutesApp;