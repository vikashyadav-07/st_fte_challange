import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
import { BsBoxArrowUpRight } from "react-icons/bs";

const Dashboard = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const fetchBanners = () => {
    axios.get("https://st-fte-challange.onrender.com/api/getallbanners")
      .then((response) => {
        const sortedBanners = response.data.banners.sort((a, b) => a.id - b.id);
        setBanners(sortedBanners);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openEditor = (banner = null) => {
    setEditingBanner(banner);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditingBanner(null);
  };

  const navigateToBannerPage = (id) => {
    navigate(`/banner/${id}`);
  };

  const handleEditorSubmit = () => {
    closeEditor();
    fetchBanners(); 
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div>
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black mx-2">Home</button>
          <button
            onClick={() => openEditor()}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black"
          >
            Create New Banner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="relative p-4 border rounded shadow-md">
            <div className="text-sm text-gray-500">ID: {banner.id}</div>
            <div className="text-xl font-semibold">{banner.desc}</div>
            <div className="text-gray-600">Time: {banner.timer}s</div>
            <span className="">Type: {banner.type}</span>
            <div className="flex items-center text-sm">
              <span>Visibility: {banner.visibility ? "On" : "Off"}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Link: <a href={`https://banner-0155.netlify.app/banner/${banner.id}`} className="text-blue-500">https://banner-0155.netlify.app/banner/{banner.id}</a></span>
              <BsBoxArrowUpRight className="cursor-pointer text-blue-500" onClick={() => navigateToBannerPage(banner.id)} />
            </div>
            <button
              onClick={() => openEditor(banner)}
              className="px-3 py-1 text-white bg-gray-800 rounded hover:bg-black"
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={closeEditor}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <Editor
              isUpdate={!!editingBanner}
              banner={editingBanner}
              onSubmit={handleEditorSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
