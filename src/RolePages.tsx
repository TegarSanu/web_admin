// src/router/rolePages.ts

import React from "react";

// SUPERADMIN
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import SuperAdminCompany from "./pages/superadmin/Company/Company";
import SuperAdminCompanyAdd from "./pages/superadmin/Company/AddCompany";
import SuperAdminPayment from "./pages/superadmin/Payment/Payment";
import SuperAdminInvoice from "./pages/superadmin/Invoice/Invoice";
import SuperAdminAdmin from "./pages/superadmin/Admin/Admin";

// ADMIN
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCompany from "./pages/admin/Company/Company";
import AdminPayment from "./pages/admin/Payment/Payment";
import AdminInvoice from "./pages/admin/Invoice/Invoice";
import AdminAdmin from "./pages/admin/Admin/Admin";

// Define role-based routes in a single source of truth
export const rolePages: Record<
  string,
  { path: string; element: React.ReactElement }[]
> = {
  superadmin: [
    { path: "dashboard", element: <SuperAdminDashboard /> },
    { path: "company", element: <SuperAdminCompany /> },
    { path: "company/add", element: <SuperAdminCompanyAdd /> },
    { path: "payment", element: <SuperAdminPayment /> },
    { path: "invoice", element: <SuperAdminInvoice /> },
    { path: "admin", element: <SuperAdminAdmin /> },
  ],
  admin: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "company", element: <AdminCompany /> },
    { path: "company/add", element: <AdminCompany /> }, // reuse
    { path: "payment", element: <AdminPayment /> },
    { path: "invoice", element: <AdminInvoice /> },
    { path: "admin", element: <AdminAdmin /> },
  ],
};
