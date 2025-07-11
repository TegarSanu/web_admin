import BaseLayout from "./BaseLayoutAdmin";
import LineChart from "../../components/BarChart";

const AdminDashboard = () => {
  return (
    <BaseLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the dashboard!</p>
        {/* Add more dashboard content here */}
      </div>
    </BaseLayout>
  );
};

export default AdminDashboard;
