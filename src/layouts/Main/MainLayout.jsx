import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <ScrollToTop />
      <main className="flex-grow">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
