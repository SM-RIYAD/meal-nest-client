import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Header from "../shared/Header";
import "./Root.css";
import Footer from "../shared/Footer.css/Footer";

const Root = () => {
  return (
    <div className="font-class ">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
