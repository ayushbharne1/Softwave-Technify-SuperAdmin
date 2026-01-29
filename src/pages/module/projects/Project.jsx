import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  CreditCard,
  Landmark,
  Wallet,
  Banknote,
  BadgeDollarSign,
  TrendingUp,
  QrCode,
  Building2,
  User,
  Briefcase,
  LayoutDashboard,
  Plus,
  Edit,
} from "lucide-react";
import { Archive, Edit2Icon, } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { fetchProjectTypes } from "../../../redux/slice/project/getprojectSlice";
import { useDispatch, useSelector } from "react-redux";


const Project = () => {
  const iconMap = {
    "Credit Card": <CreditCard className="w-8 h-8 text-blue-600" />,
    "Demat Account": <Landmark className="w-8 h-8 text-blue-600" />,
    "Savings Account": <Wallet className="w-8 h-8 text-blue-600" />,
    "Instant Loan": <Banknote className="w-8 h-8 text-blue-600" />,
    "BNPL": <BadgeDollarSign className="w-8 h-8 text-blue-600" />,
    "Investment Account": <TrendingUp className="w-8 h-8 text-blue-600" />,
    "UPI": <QrCode className="w-8 h-8 text-blue-600" />,
    "Business Account": <Building2 className="w-8 h-8 text-blue-600" />,
    "Personal Loan": <User className="w-8 h-8 text-blue-600" />,
    "Business Loan": <Briefcase className="w-8 h-8 text-blue-600" />,
  };
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const dispatch = useDispatch();
  // const { list: projects, loading, error } = useSelector((state) => state.getproject);
  // const {
  //   projectTypes = [],
  //   loadingTypes: loading,
  //   error,
  // } = useSelector((state) => state.getproject);


  // useEffect(() => {
  //   dispatch(fetchProjectTypes());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchProjectTypes());
  // }, [dispatch]);
  const { projectTypes, loading, error } = useSelector(
    (state) => state.getproject
  );

  useEffect(() => {
    dispatch(fetchProjectTypes());
  }, [dispatch]);


  const [form, setForm] = useState({
    name: "",
    category: "Credit Card",
    commission: "",
    payoutCycle: "Monthly",
  });

  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...p, ...form } : p
        )
      );
      setEditingId(null);
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...form,
          status: true,
        },
      ]);
    }

    setForm({ name: "", category: "Credit Card", commission: "", payoutCycle: "Monthly" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    const confirmdelete = window.confirm("Are yoy sure you want to delete this Product")
    if (!confirmdelete)
      return;
    const UpdateProduct = products.filter((p) => p.id !== id)
    setProducts(UpdateProduct);
    localStorage.setItem("products", JSON.stringify(UpdateProduct))

  };

  const toggleStatus = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: !p.status } : p
      )
    );
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      {/* Header */}
      <div className=" mb-5 mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
          <h1 className="text-2xl font-semibold text-white">Project</h1>

          <div className="text-[15px] text-white flex items-center gap-2 mt-2">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <LayoutDashboard size={16} />
            </NavLink>

            <span>&gt;</span>

            <NavLink to="/projects" className="hover:text-blue-600 transition">
              Project
            </NavLink>
          </div>
        </div>

      </div>
      <div className="flex justify-start mb-6">
        <Link
          to="/projects/add-project"
          className="
            flex items-center gap-2
            bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white
            px-6 py-4 rounded-lg
            text-sm font-semibold
            transition-all duration-300
            hover:bg-blue-700
            hover:shadow-md
          "
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      {/* Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          onClick={() => navigate("/project/credit-card")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            Credit Card
          </h2>
        </div>

        <div
          onClick={() => navigate("/project/demat-account")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Landmark className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            Demat Account
          </h2>
        </div>
        <div
          onClick={() => navigate("/project/savings-account")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Wallet className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            Savings Account
          </h2>
        </div>
        <div
          onClick={() => navigate("/project/instant-loan")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Banknote className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            Instant Loan
          </h2>
        </div>
        <div
          onClick={() => navigate("/project/bnpl")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <BadgeDollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            BNPL
          </h2>
        </div>
        <div
          onClick={() => navigate("/project/investment-account")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            Investment Account
          </h2>
        </div>
        <div
          onClick={() => navigate("/project/upi")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <QrCode className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            UPI
          </h2>
        </div>
        <div
          onClick={() => navigate("/project/business-account")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            Business Account
          </h2>
        </div>
        <div
          onClick={() => navigate("/project/personal-loan")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            Personal Loan
          </h2>
        </div>
        <div
          onClick={() => navigate("/project/business-loan")}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-300
          hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
            Business Loan
          </h2>
        </div>

      </div> */}


      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projectTypes.map((projectType) => (
          <div
            key={projectType}
            onClick={() =>
              navigate(`/project/${projectType.toLowerCase().replace(/\s+/g, "-")}`)
            }
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
      cursor-pointer transition-all duration-300
      hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              {iconMap[projectType] || (
                <CreditCard className="w-8 h-8 text-blue-600" />
              )}
            </div>

            <h2 className="text-base font-semibold text-gray-800 text-center mt-4">
              {projectType}
            </h2>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projectTypes.map((type) => (
          <div
            key={type}
            onClick={() =>
              navigate(`/project/${type.toLowerCase().replace(/\s+/g, "-")}`, {
                state: {
                  projectType: type,
                },
              })
            }
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              {iconMap[type] || <CreditCard className="w-8 h-8 text-blue-600" />}
            </div>
            <h2 className="text-base font-semibold text-gray-800 text-center mt-4">{type}</h2>
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {projectTypes.map((type) => (
          <div
            key={type}
            onClick={() => navigate(`/project/${type}`, { state: { backendType: type } })}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50 transition"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              {iconMap[type] || <CreditCard className="w-8 h-8 text-blue-600" />}
            </div>
            <h2 className="text-base font-semibold text-gray-800">{type}</h2>
          </div>
        ))}
      </div> */}

      <div className="bg-white p-5 rounded-xl shadow mb-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Credit Card</option>
            <option>Loan</option>
            <option>Demat</option>
            <option>Account</option>
          </select>

          <input
            type="number"
            name="commission"
            placeholder="Commission %"
            value={form.commission}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="payoutCycle"
            value={form.payoutCycle}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          <button
            type="submit"
            className="md:col-span-4 bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white py-2 rounded hover:bg-blue-900"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
      <div className=" shadow-xl rounded-2xl overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className="bg-[#0B1C2D] sticky top-0 z-10">
            <tr className="text-blue-100 uppercase text-sm tracking-wider">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-center">Category</th>
              <th className="p-4 text-center">Commission</th>
              <th className="p-4 text-center">Payout Cycle</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className={`border-t ${!product.status ? "bg-gray-200 text-gray-400" : "bg-white"}  hover:bg-blue-50`}
              >
                <td className="p-3">{product.name}</td>
                <td className="p-3 text-center">{product.category}</td>
                <td className="p-3 text-center">{product.commission}%</td>
                <td className="p-3 text-center">{product.payoutCycle}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${product.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {product.status ? "Enabled" : "Disabled"}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-red-500 "
                  >
                    <Edit className="w-5 h-6 text-blue-600 " />

                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    <Archive className="w-5 h-6 text-red-500 " />

                  </button>

                  <button className="px-2 py-1" onClick={() => toggleStatus(product.id)}
                  >
                    {product.status ? (
                      <FaToggleOn className="text-green-500 text-3xl " />
                    ) : (
                      <FaToggleOff className="text-red-400 text-3xl" />
                    )}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Project;

