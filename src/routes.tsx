import { Routes, Route } from "react-router-dom";
import App from "@pages/index";
import DashboardDoc from "@pages/dashboard_doc"; // Cambia esto por el nombre correcto




const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
        <Route path="/dashboard-doc" element={<DashboardDoc />} />
      </Routes>
    </>
  );
};

export default AppRouter;
