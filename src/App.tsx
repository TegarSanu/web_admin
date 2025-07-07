import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Routes";
import "react-toastify/dist/ReactToastify.css";
import setupAxios from "./api/setupAxios";

setupAxios();

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
