import React from "react";

interface LoadingOverlayProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  id,
  className,
  children,
}) => {
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
