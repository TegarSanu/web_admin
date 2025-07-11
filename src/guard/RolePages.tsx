// src/router/rolePages.ts

import React from "react";

// SUPERADMIN
import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import SuperAdminCompany from "../pages/superadmin/Company/Company";
import SuperAdminCompanyAdd from "../pages/superadmin/Company/AddCompany";
import SuperAdminPayment from "../pages/superadmin/Payment/Payment";
import SuperAdminInvoice from "../pages/superadmin/Invoice/Invoice";
import SuperAdminAdmin from "../pages/superadmin/Admin/Admin";
import SuperAdminAdminAdd from "../pages/superadmin/Admin/AddAdmin";

// ADMIN
import AdminDashboard from "../pages/company/Dashboard";
import AdminCompany from "../pages/company/Company/Company";
import AdminPayment from "../pages/company/Payment/Payment";
import AdminInvoice from "../pages/company/Invoice/Invoice";
import Login from "../pages/Login";

// Define role-based routes in a single source of truth
export const rolePages: Record<
  string,
  { path: string; element: React.ReactElement }[]
> = {
  "admin-dashboard": [
    { path: "", element: <SuperAdminDashboard /> },
    { path: "login", element: <Login /> },
    { path: "company", element: <SuperAdminCompany /> },
    { path: "company/add", element: <SuperAdminCompanyAdd /> },
    { path: "payment", element: <SuperAdminPayment /> },
    { path: "invoice", element: <SuperAdminInvoice /> },
    { path: "admin", element: <SuperAdminAdmin /> },
    { path: "admin/add", element: <SuperAdminAdminAdd /> },
  ],
  "company-dashboard": [
    { path: "", element: <AdminDashboard /> },
    { path: "login", element: <Login /> },
    { path: "company", element: <AdminCompany /> },
    { path: "company/add", element: <AdminCompany /> }, // reuse
    { path: "payment", element: <AdminPayment /> },
    { path: "invoice", element: <AdminInvoice /> },
  ],
};
