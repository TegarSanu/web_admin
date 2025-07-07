import { useDispatch } from "react-redux";
import BaseLayout from "../BaseLayout";
import { useEffect } from "react";
import { setLoading } from "../redux/features/loading/loadingSlice";

const Company = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, []);

  return (
    <BaseLayout activeUrl="/company">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Company</h1>
        <p>Welcome to the Company!</p>
        {/* Add more Company content here */}
      </div>
    </BaseLayout>
  );
};

export default Company;
