import React from "react";
import { LucideIcon } from "lucide-react"; // You can replace this with your actual icon library

interface IconButtonProps {
  icon: LucideIcon;
  actionName: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  actionName,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className=" text-white p-4 rounded-lg shadow-md  transition flex flex-col items-center space-y-2"
    >
      <div className="bg-teal-600 p-4 rounded-full">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium">{actionName}</span>
    </button>
  );
};

export default IconButton;
