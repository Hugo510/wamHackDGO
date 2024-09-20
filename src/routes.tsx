import { Routes, Route } from "react-router-dom";
import App from "@pages/index";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
