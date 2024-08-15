import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner2 from "./Banner2";
import { useParams, useNavigate } from "react-router-dom";

const BannerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    axios.get(`https://st-fte-challange.onrender.com/api/getbanner/${id}`)
      .then((response) => {
        setBanner(response.data.banner);
      })
      .catch((error) => {
        console.error("Error fetching banner:", error);
      });
  }, [id]);

  if (!banner) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Specified Banner Page</h2>
        <div>
          <button onClick={()=>navigate("/")} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black mx-2" >Home</button>
          <button onClick={()=>navigate("/dashboard")} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black mx-2" >Dashboard</button>
        </div>
      </div>
      <div>If the banner is not visible, then please check weather visibility of that banner may be off or the timer may have ended. Try toogling the visibility.</div>
      <Banner2
        id={banner.id}
        desc={banner.desc}
        t={banner.timer}
        type={banner.type}
        visibility={banner.visibility}
      />
    </div>
  );
};

export default BannerPage;
