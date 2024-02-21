import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";

const Layout = ({ onChangeWaiting }) => {
  return (
    <>
      <NavBar onChangeWaiting={onChangeWaiting} />
      <Outlet />
    </>
  );
};

export default Layout;
