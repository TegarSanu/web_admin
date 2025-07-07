import BaseLayout from "../BaseLayout";

const Admin = () => {
  return (
    <BaseLayout activeUrl="/admin">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin</h1>
        <p>Welcome to the Admin!</p>
        {/* Add more Admin content here */}
      </div>
    </BaseLayout>
  );
};

export default Admin;
