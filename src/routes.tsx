import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "@pages/index";
import DashboardDoc from "@pages/dashboard_doc";
import DashboardCeo from "@pages/dashboard_ceo"; // Asegúrate de usar la ruta correcta
import Register from "@pages/register";



const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
        <Route path="/dashboard_doc" element={<DashboardDoc />} />
        <Route path="/dashboard_ceo" element={<DashboardCeo />} /> 
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AppRouter;
