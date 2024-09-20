import { Routes, Route } from "react-router-dom";
import App from "@pages/index";
import DashboardDoc from "@pages/dashboard_doc";
import DashboardCeo from "@pages/layouts/dashboard_ceo"; // Asegúrate de usar la ruta correcta
import Register from "@pages/register";
import Demographic from "@pages/ceo/Demographic";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
        <Route path="/dashboard_doc" element={<DashboardDoc />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard_ceo/" element={<DashboardCeo />}>
          <Route path="base" element={<Demographic />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
