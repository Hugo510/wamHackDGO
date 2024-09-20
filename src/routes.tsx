import { Routes, Route } from "react-router-dom";
import App from "@pages/index";
import DashboardDoc from "@pages/dashboard_doc";
import DashboardCeo from "@pages/layouts/dashboard_ceo"; 
import Register from "@pages/register";
import Demographic from "@pages/ceo/Demographic";
import AIAssistant from "@pages/ai_text_selector"; // Importa el componente de la nueva página
import Capture from "@pages/id-capture"

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard_doc" element={<DashboardDoc />} />
        <Route path="/register/" element={<Register />}>
          <Route path="base" element={<Capture />} />
        </Route>
        <Route path="/ai_text_selector" element={<AIAssistant />} /> 
        <Route path="/dashboard_ceo/" element={<DashboardCeo />}>
          <Route path="base" element={<Demographic />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;