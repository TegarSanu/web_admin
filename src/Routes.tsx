import Admin from "./pages/Admin";
import Company from "./pages/Company";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login";
import Payment from "./pages/Payment";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/company", element: <Company /> },
  { path: "/payment", element: <Payment /> },
  { path: "/invoice", element: <Invoice /> },
  { path: "/admin", element: <Admin /> },
];

export default routes;
