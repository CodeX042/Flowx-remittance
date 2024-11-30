/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface MainContentProps {
  children: any;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 h-full  text-gray-300 overflow-y-auto w-full max-h-[90vh]">
      <div className="px-10 pb-10 w-full h-full">
        {/* Dynamic Content Area */}
        {children}
      </div>
    </main>
  );
};

export default MainContent;
