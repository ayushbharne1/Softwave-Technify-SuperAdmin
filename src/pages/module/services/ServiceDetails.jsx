import { useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServiceDetails,
  clearServiceDetails,
} from "../../../redux/slice/services/getDetails";
import { LayoutDashboard, Pencil } from "lucide-react";
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.serviceDetails
  );

  useEffect(() => {
    dispatch(fetchServiceDetails(id));

    return () => {
      dispatch(clearServiceDetails());
    };
  }, [dispatch, id]);

  if (loading) return <LoaderSpinner />;

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7" />
              Project Management
            </h1>

            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3 flex-wrap">
              <NavLink to="/dashboard">
                <span className="bg-white/20 px-3 py-1 rounded-lg">
                  Dashboard
                </span>
              </NavLink>
              <span className="text-white/60">›</span>
              <NavLink to="/services">
                <span className="bg-white/20 px-3 py-1 rounded-lg">
                  Project
                </span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">
                Project Details
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT IMAGE */}
          <div className="h-full max-h-[420px] overflow-hidden">
            <img
              src={data.thumbnail}
              alt={data.projectName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="p-6 relative">
            {/* Edit Button */}
            <button
              onClick={() => navigate(`/services/edit/${id}`)}
              className="absolute top-6 right-6 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              <Pencil size={16} />
              Edit
            </button>

            {/* Title & Status */}
            <div className="flex items-center justify-between mb-4 mt-10">
              <h1 className="text-2xl font-bold text-gray-800">
                {data.projectName}
              </h1>

              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  data.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {data.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-bold text-orange-600">
                  ₹{data.price}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Earnings</p>
                <p className="text-xl font-bold text-blue-600">
                  {data.totalEarnings.amount}
                  {data.totalEarnings.type === "percentage" ? "%" : ""}
                </p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Created On</p>
                <p className="text-md font-semibold text-emerald-700">
                  {new Date(data.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
