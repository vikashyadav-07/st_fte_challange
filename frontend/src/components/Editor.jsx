import React, { useState, useEffect } from "react";
import axios from "axios";

const Editor = ({ isUpdate, banner, onSubmit }) => {
  const [desc, setDesc] = useState("");
  const [timer, setTimer] = useState(0);
  const [visibility, setVisibility] = useState(true);
  const [type, setType] = useState("default");

  useEffect(() => {
    if (isUpdate && banner) {
      setDesc(banner.desc);
      setTimer(banner.timer);
      setVisibility(banner.visibility);
      setType(banner.type);
    }
  }, [isUpdate, banner]);

  const handleCreate = () => {
    const data = { desc, timer: parseInt(timer, 10), visibility, type };
    axios
      .post("https://st-fte-challange.onrender.com/api/postbanner", data)
      .then(() => onSubmit())
      .catch((error) => console.error("Error creating banner:", error));
  };

  const handleUpdate = () => {
    const data = { desc, timer: parseInt(timer, 10), visibility, type, id: banner.id };
    axios
      .put("https://st-fte-challange.onrender.com/api/updatebanner", data)
      .then(() => onSubmit())
      .catch((error) => console.error("Error updating banner:", error));
  };

  const handleSubmit = () => {
    if (isUpdate) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <div className="space-y-4 w-72 md:w-96">
      <div>
        <label className="block text-gray-700">Description:</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Timer (seconds):</label>
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          className="w-full p-2 border rounded"
          min="0"
        />
      </div>
      <div>
        <label className="block text-gray-700">Visibility:</label>
        <div className="flex items-center">
          <button
            onClick={() => setVisibility(true)}
            className={`px-4 py-2 border rounded-l ${visibility ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            On
          </button>
          <button
            onClick={() => setVisibility(false)}
            className={`px-4 py-2 border rounded-r ${!visibility ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Off
          </button>
        </div>
      </div>
      <div>
        <label className="block text-gray-700">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="default">Default</option>
          <option value="neutral">Neutral</option>
          <option value="primary">Primary</option>
          <option value="successful">Successful</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {isUpdate ? "Update" : "Create"} Banner
      </button>
    </div>
  );
};

export default Editor;
