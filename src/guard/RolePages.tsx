// src/router/rolePages.ts

import React from "react";

// SUPERADMIN
import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import SuperAdminCompany from "../pages/superadmin/Company/Company";
import SuperAdminCompanyAdd from "../pages/superadmin/Company/AddCompany";
import SuperAdminCompanyUser from "../pages/superadmin/CompanyUser/CompanyUser";
import SuperAdminCompanyUserAdd from "../pages/superadmin/CompanyUser/AddCompanyUser";
import SuperAdminPayment from "../pages/superadmin/Payment/Payment";
import SuperAdminPaymentConfig from "../pages/superadmin/Payment/PaymentConfig";
import SuperAdminPaymentConfigAdd from "../pages/superadmin/Payment/PaymentConfigAdd";
import SuperAdminAdmin from "../pages/superadmin/Admin/Admin";
import SuperAdminAdminAdd from "../pages/superadmin/Admin/AddAdmin";

// ADMIN
import AdminDashboard from "../pages/user/Dashboard";
import AdminCompany from "../pages/user/Company/Company";
import AdminCompanyUser from "../pages/user/CompanyUser/CompanyUser";
import AdminPayment from "../pages/user/Payment/Payment";
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
    { path: "company-user", element: <SuperAdminCompanyUser /> },
    { path: "company-user/add", element: <SuperAdminCompanyUserAdd /> },
    { path: "payment", element: <SuperAdminPayment /> },
    { path: "payment-config", element: <SuperAdminPaymentConfig /> },
    { path: "payment-config/add", element: <SuperAdminPaymentConfigAdd /> },
    { path: "admin", element: <SuperAdminAdmin /> },
    { path: "admin/add", element: <SuperAdminAdminAdd /> },
  ],
  "company-dashboard": [
    { path: "", element: <AdminDashboard /> },
    { path: "login", element: <Login /> },
    { path: "company", element: <AdminCompany /> },
    { path: "company-user", element: <AdminCompanyUser /> },
    { path: "payment", element: <AdminPayment /> },
  ],
};
