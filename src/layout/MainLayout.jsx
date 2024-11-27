import { Outlet } from "react-router-dom";

import Topbar from "../components/Topbar";

const MainLayout = () => (
  <>
    <Topbar />
    <Outlet />
  </>
);

export default MainLayout;
