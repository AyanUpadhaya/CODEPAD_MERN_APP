import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default Layout;
