import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
