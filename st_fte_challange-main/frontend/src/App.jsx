import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBanners from "./components/AllBanners";
import Dashboard from "./components/Dashboard";
import BannerPage from "./components/BannerPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllBanners />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banner/:id" element={<BannerPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
