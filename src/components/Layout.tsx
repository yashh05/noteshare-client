import Footer from "./Footer";
import Navbar from "./Navbar";
// import Home from "@/Routes/Home";
// import Dashboard from "@/Routes/Dashboard";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
