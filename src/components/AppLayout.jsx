import React from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import SummaryStats from "./SummaryStats";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Header />
      <div className="controls-bar">
        <SummaryStats />
      </div>
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AppLayout;
