import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Banner2 from "./Banner2"; 

function AllBanners() {
  const navigate = useNavigate(); 
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("https://st-fte-challange.onrender.com/api/getallbanners")
      .then((response) => {
        setBanners(response.data.banners);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  }, []);

  const navigateToDashboard = () => {
    navigate("/dashboard"); 
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="text-lg font-semibold">All Banners Are Here</div>
        <button
          onClick={navigateToDashboard}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
        >
          Dashboard
        </button>
      </nav>
      <div className="p-4">
        {banners.map((banner) => (
          <Banner2
            key={banner.id}
            id={banner.id}
            desc={banner.desc}
            t={banner.timer}
            type={banner.type}
            visibility={banner.visibility}
          />
        ))}
      </div>
    </div>
  );
}

export default AllBanners;
