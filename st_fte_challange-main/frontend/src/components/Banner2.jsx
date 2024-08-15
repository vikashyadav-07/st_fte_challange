import React, { useState, useEffect } from "react";
import { IoMdAlert } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";

const Banner2 = ({ id, desc, t, type, visibility }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const typeStyles = {
    default: { borderColor: "border-black", icon: null },
    neutral: { borderColor: "border-black", icon: <IoMdAlert className="text-black" /> },
    primary: { borderColor: "border-blue-500", icon: <IoMdAlert className="text-blue-500" /> },
    successful: { borderColor: "border-green-500", icon: <BsCheckCircleFill className="text-green-500" /> },
    warn: { borderColor: "border-red-500", icon: <IoMdAlert className="text-red-500" /> },
    error: { borderColor: "border-red-500", icon: <IoMdAlert className="text-red-500" /> },
  };

  const { borderColor, icon } = typeStyles[type] || typeStyles.default;

  function setOff(){
    const data = {id, visibility: false};
    axios.put("https://st-fte-challange.onrender.com/api/updatebanner", data)
      .catch((error) => console.error("Error updating banner:", error));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 100 / (t * 100), 0));
    }, 10);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setOff();
    }, t * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [t]);

  if (!visibility) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-500 text-yellow-700 rounded">
        Visibility of banner is set to off, please toggle the visibility.
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className={`relative flex items-center w-full h-10 font-semibold shadow-md ${borderColor} border rounded-sm px-6 my-4`}>
      {icon && <span className="mr-2">{icon}</span>}
      <div className="flex-grow">{desc}</div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6">
        <CircularProgressbar
          value={progress}
          maxValue={100}
          styles={buildStyles({
            pathColor: '#4A90E2',
            trailColor: '#D6D6D6',
            strokeLinecap: 'round',
          })}
        />
      </div>
    </div>
  );
};

export default Banner2;
