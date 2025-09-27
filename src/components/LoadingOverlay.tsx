import React from "react";

interface LoadingOverlayProps {
  id?: string;
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ id, className }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white ${className}`}
    >
      <div
        id={id}
        className="loading loading-spinner loading-xl text-primary"
      ></div>
    </div>
  );
};

export default LoadingOverlay;
