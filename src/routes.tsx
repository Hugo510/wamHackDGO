import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "@pages/index";
import DashboardDoc from "@pages/dashboard_doc";
import DashboardCeo from "@pages/dashboard_ceo"; // Asegúrate de usar la ruta correcta



const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
        <Route path="/dashboard-doc" element={<DashboardDoc />} />
        <Route path="/dashboard_ceo" element={<DashboardCeo />} /> 
      </Routes>
    </>
  );
};

export default AppRouter;
