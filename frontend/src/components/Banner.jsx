import React, { useState, useEffect } from "react";

const Banner = ({ desc, t }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 100 / (t * 100), 0));
    }, 10); 

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, t * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [t]);

  if (!isVisible) return null;

  return (
    <div className="relative flex flex-col items-center rounded-sm justify-center w-full h-10 font-semibold shadow-md border border-blue-700">
      <div>{desc}</div>
      <div
        className="absolute bottom-0 left-0 h-1 bg-gray-400"
        style={{ width: `${progress}%`, transition: "width 0.01s linear" }}
      ></div>
    </div>
  );
};

export default Banner;
