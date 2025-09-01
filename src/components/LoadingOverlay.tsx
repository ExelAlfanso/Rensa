import React from "react";

interface LoadingOverlayProps {
  id?: string;
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ id, className }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        id={id}
        className={`loading loading-spinner loading-xl h-screen ${className}`}
      ></div>
    </div>
  );
};

export default LoadingOverlay;
