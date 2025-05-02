import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-12 w-12 border-4",
};

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div
        className={`${sizeClasses[size]} rounded-full border-solid border-gray-300 border-t-primary animate-spin`}
      />
    </div>
  );
};

export const FullPageLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Loading size="lg" />
    </div>
  );
};
