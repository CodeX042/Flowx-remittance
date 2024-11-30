import React from "react";

import { Outlet } from "react-router-dom"; // This will render child routes
import Header from "./containers/Header";
import MainContent from "./containers/MainContent";
import Sidebar from './containers/Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <MainContent>
          <Outlet /> {/* Render the matched page content here */}
        </MainContent>
      </div>
    </div>
  );
};

export default Layout;
