import BaseLayout from "../company/BaseLayoutCompany";
import LineChart from "../../components/BarChart";

const CompanyDashboard = () => {
  return (
    <BaseLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the dashboard!</p>
        <LineChart />
        {/* Add more dashboard content here */}
      </div>
    </BaseLayout>
  );
};

export default CompanyDashboard;
