import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
    // console.log('layout called');

  return (
    <div className="App">
      <Header></Header>
       <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default Layout;
