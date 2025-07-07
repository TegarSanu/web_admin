import BaseLayout from "../BaseLayout";
import LineChart from "../components/LineCharts";

const Dashboard = () => {
  return (
    <BaseLayout activeUrl="/">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the dashboard!</p>
        <LineChart />
        {/* Add more dashboard content here */}
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
