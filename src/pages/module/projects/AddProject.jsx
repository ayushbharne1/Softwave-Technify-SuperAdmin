// import React, { useState } from "react";
// import { Plus, Trash2 } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import { LayoutDashboard } from "lucide-react";
// const AddProject = () => {
//   const [formData, setFormData] = useState({
//     projectType: "",
//     projectName: "",
//     companyName: "",
//     payoutsDetails: "",
//     guide: "",
//     eligibility: "",
//     productDetails: "",
//     status: "active",
//     descriptions: [""],
//     goals: [
//       {
//         description: "",
//         commission: "",
//         commissionType: "fixed",
//       },
//     ],
//     logo: null,
//   });

//   /* ---------------- BASIC HANDLERS ---------------- */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, logo: e.target.files[0] });
//   };

//   /* ---------------- DESCRIPTION HANDLERS ---------------- */
//   const addDescription = () => {
//     setFormData({
//       ...formData,
//       descriptions: [...formData.descriptions, ""],
//     });
//   };

//   const removeDescription = (index) => {
//     const updated = formData.descriptions.filter((_, i) => i !== index);
//     setFormData({ ...formData, descriptions: updated });
//   };

//   const updateDescription = (index, value) => {
//     const updated = [...formData.descriptions];
//     updated[index] = value;
//     setFormData({ ...formData, descriptions: updated });
//   };

//   /* ---------------- GOALS HANDLERS ---------------- */
//   const addGoal = () => {
//     setFormData({
//       ...formData,
//       goals: [
//         ...formData.goals,
//         { description: "", commission: "", commissionType: "fixed" },
//       ],
//     });
//   };

//   const removeGoal = (index) => {
//     const updated = formData.goals.filter((_, i) => i !== index);
//     setFormData({ ...formData, goals: updated });
//   };

//   const updateGoal = (index, field, value) => {
//     const updated = [...formData.goals];
//     updated[index][field] = value;
//     setFormData({ ...formData, goals: updated });
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">

//       <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
//                       rounded-2xl p-6 shadow-lg mb-6 mt-6">
//           <h1 className="text-2xl font-semibold text-white">Project</h1>

//           <div className="text-[15px] text-white flex items-center gap-2 mt-2">
//             <NavLink
//               to="/dashboard"
//               className="flex items-center gap-1 hover:text-blue-600 transition"
//             >
//               <LayoutDashboard size={16} />
//             </NavLink>

//             <span>&gt;</span>

//             <NavLink to="/projects" className="hover:text-blue-600 transition">
//               Project
//             </NavLink>

//             <span>&gt;</span>
//             <span>Add Project</span>
//           </div>
//         </div>


//       <div className="max-w-full mx-auto bg-white rounded-xl shadow p-6">
//         <h1 className="text-2xl font-semibold mb-6">Add New Project</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* BASIC INFO */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <Input label="Project Type" name="projectType" onChange={handleChange} />
//             <Input label="Project Name" name="projectName" onChange={handleChange} />
//             <Input label="Company Name" name="companyName" onChange={handleChange} />
//             <Input label="Payout Details" name="payoutsDetails" onChange={handleChange} />
//           </div>

//           <Textarea label="Guide" name="guide" onChange={handleChange} />
//           <Textarea label="Eligibility" name="eligibility" onChange={handleChange} />
//           <Textarea label="Product Details" name="productDetails" onChange={handleChange} />

//           {/* DESCRIPTIONS */}
//           <div className="bg-gray-50  rounded-lg">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-semibold">Descriptions</h3>
//               <button
//                 type="button"
//                 onClick={addDescription}
//                 className="flex items-center gap-1 text-sm text-blue-600"
//               >
//                 <Plus size={16} /> Add Descriptions
//               </button>
//             </div>

//             <div className="space-y-3">
//               {formData.descriptions.map((desc, i) => (
//                 <div key={i} className="flex gap-2">
//                   <input
//                     type="text"
//                     value={desc}
//                     onChange={(e) =>
//                       updateDescription(i, e.target.value)
//                     }
//                     className="w-full border rounded-lg px-4 py-2"
//                     placeholder={`Description ${i + 1}`}
//                   />
//                   {formData.descriptions.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeDescription(i)}
//                       className="text-red-500"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* GOALS */}
//           <div className="bg-gray-50 rounded-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold">Goals</h3>
//               <button
//                 type="button"
//                 onClick={addGoal}
//                 className="flex items-center gap-1 text-sm text-blue-600"
//               >
//                 <Plus size={16} /> Add Goal
//               </button>
//             </div>

//             <div className="space-y-4">
//               {formData.goals.map((goal, i) => (
//                 <div
//                   key={i}
//                   className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-white p-3 rounded-lg border"
//                 >
//                   <Input
//                     label="Description"
//                     value={goal.description}
//                     onChange={(e) =>
//                       updateGoal(i, "description", e.target.value)
//                     }
//                   />
//                   <Input
//                     label="Commission"
//                     value={goal.commission}
//                     onChange={(e) =>
//                       updateGoal(i, "commission", e.target.value)
//                     }
//                   />
//                   <Select
//                     label="Type"
//                     value={goal.commissionType}
//                     onChange={(e) =>
//                       updateGoal(i, "commissionType", e.target.value)
//                     }
//                     options={["fixed", "percentage"]}
//                   />
//                   {formData.goals.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeGoal(i)}
//                       className="text-red-500 mt-6"
//                     >
//                       <Trash2 />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* STATUS + LOGO */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <Select
//               label="Status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               options={["active", "inactive"]}
//             />

//             <div>
//               <label className="block text-sm font-medium mb-1">Logo</label>
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="w-full border rounded-lg px-3 py-2"
//               />
//             </div>
//           </div>

//           {/* SUBMIT */}
//           <div className="flex justify-center mt-5">
//             <button className="bg-[#0E5FD8] text-white px-6 py-2 rounded-lg">
//               Save Project
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProject;

// /* ---------- SMALL COMPONENTS ---------- */
// const Input = ({ label, ...props }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">{label}</label>
//     <input
//       {...props}
//       className="w-full border rounded-lg px-4 py-2"
//     />
//   </div>
// );

// const Textarea = ({ label, ...props }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">{label}</label>
//     <textarea
//       {...props}
//       rows={3}
//       className="w-full border rounded-lg px-4 py-2"
//     />
//   </div>
// );

// const Select = ({ label, options, ...props }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">{label}</label>
//     <select
//       {...props}
//       className="w-full border rounded-lg px-4 py-2"
//     >
//       {options.map((o) => (
//         <option key={o}>{o}</option>
//       ))}
//     </select>
//   </div>
// );





import React, { useEffect } from "react";
import { Plus, Trash2, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../../redux/slice/project/projectSlice"
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  projectType: Yup.string().required("Project Type is required"),
  projectName: Yup.string().required("Project Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  payoutsDetails: Yup.string().required("Payout details are required"),
  guide: Yup.string().required("Guide is required"),
  eligibility: Yup.string().required("Eligibility is required"),
  productDetails: Yup.string().required("Product details are required"),
  status: Yup.string().required(),
  descriptions: Yup.array()
    .of(Yup.string().required("Description cannot be empty"))
    .min(1, "At least one description required"),
  goals: Yup.array()
    .of(
      Yup.object({
        description: Yup.string().required("Goal description required"),
        commission: Yup.number()
          .typeError("Commission must be a number")
          .required("Commission required"),
        commissionType: Yup.string().required(),
      })
    )
    .min(1, "At least one goal required"),
  logo: Yup.mixed().required("Logo is required"),
});

const AddProject = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.project);

  const formik = useFormik({
    initialValues: {
      projectType: "",
      projectName: "",
      companyName: "",
      payoutsDetails: "",
      guide: "",
      eligibility: "",
      productDetails: "",
      status: "active",
      descriptions: [""],
      goals: [{ description: "", commission: "", commissionType: "fixed" }],
      logo: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const fd = new FormData();
      fd.append("projectType", values.projectType);
      fd.append("projectName", values.projectName);
      fd.append("companyName", values.companyName);
      fd.append("payoutsDetails", values.payoutsDetails);
      fd.append("guide", values.guide);
      fd.append("Eligibility", values.eligibility); // backend expects capital E
      fd.append("productDetails", values.productDetails);
      fd.append("status", values.status);

      values.descriptions.forEach((desc, i) =>
        fd.append(`description[${i}]`, desc)
      );
      values.goals.forEach((goal, i) => {
        fd.append(`goals[${i}][description]`, goal.description);
        fd.append(`goals[${i}][commission]`, goal.commission);
        fd.append(`goals[${i}][commissionType]`, goal.commissionType);
      });
      if (values.logo) fd.append("logo", values.logo);

      dispatch(createProject(fd));
    },
  });

  // ✅ Show toast on success/error
  useEffect(() => {
    if (success) {
      toast.success("Project created successfully!");
      formik.resetForm();
    }
    if (error) {
      toast.error(error.message || "Failed to create project!");
    }
  }, [success, error]);

  // --- Description Handlers ---
  const addDescription = () => {
    formik.setFieldValue("descriptions", [
      ...formik.values.descriptions,
      "",
    ]);
  };
  const removeDescription = (index) => {
    const updated = formik.values.descriptions.filter((_, i) => i !== index);
    formik.setFieldValue("descriptions", updated);
  };

  // --- Goal Handlers ---
  const addGoal = () => {
    formik.setFieldValue("goals", [
      ...formik.values.goals,
      { description: "", commission: "", commissionType: "fixed" },
    ]);
  };
  const removeGoal = (index) => {
    const updated = formik.values.goals.filter((_, i) => i !== index);
    formik.setFieldValue("goals", updated);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Project</h1>
        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/projects">Project</NavLink>
          <span>&gt;</span>
          <span>Add Project</span>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-full mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-6">Add New Project</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Project Type"
              name="projectType"
              value={formik.values.projectType}
              onChange={formik.handleChange}
              error={formik.errors.projectType}
            />
            <Input
              label="Project Name"
              name="projectName"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              error={formik.errors.projectName}
            />
            <Input
              label="Company Name"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={formik.errors.companyName}
            />
            <Input
              label="Payout Details"
              name="payoutsDetails"
              value={formik.values.payoutsDetails}
              onChange={formik.handleChange}
              error={formik.errors.payoutsDetails}
            />
          </div>

          <div>
            <Textarea
              label="Guide"
              name="guide"
              value={formik.values.guide}
              onChange={formik.handleChange}
              error={formik.errors.guide}
            />
            <Textarea
              label="Eligibility"
              name="eligibility"
              value={formik.values.eligibility}
              onChange={formik.handleChange}
              error={formik.errors.eligibility}
            />
            <Textarea
              label="Product Details"
              name="productDetails"
              value={formik.values.productDetails}
              onChange={formik.handleChange}
              error={formik.errors.productDetails}
            />
          </div>

          {/* DESCRIPTIONS */}
          <div className="bg-gray-50 rounded-lg p-3 min-h-[120px]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Descriptions</h3>
              <button
                type="button"
                onClick={addDescription}
                className="flex items-center gap-1 text-sm text-blue-600"
              >
                <Plus size={16} /> Add Description
              </button>
            </div>
            {formik.values.descriptions.map((desc, i) => (
              <div key={i} className="flex gap-2 mb-2 items-start">
                <div className="flex flex-col w-full">
                  <input
                    value={desc}
                    onChange={(e) =>
                      formik.setFieldValue(`descriptions.${i}`, e.target.value)
                    }
                    className="w-full bg-transparent border-b border-gray-600 px-2 py-2 focus:outline-none"
                    placeholder={`Description ${i + 1}`}
                  />
                  <p className="text-red-500 text-xs min-h-[18px]">
                    {formik.errors.descriptions?.[i] || " "}
                  </p>
                </div>
                {formik.values.descriptions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDescription(i)}
                    className="text-red-500 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* GOALS */}
          <div className="bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Goals</h3>
              <button
                type="button"
                onClick={addGoal}
                className="flex items-center gap-1 text-sm text-blue-600"
              >
                <Plus size={16} /> Add Goal
              </button>
            </div>
            {formik.values.goals.map((goal, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-white p-3 rounded-lg"
              >
                <Input
                  label="Description"
                  value={goal.description}
                  onChange={(e) =>
                    formik.setFieldValue(`goals.${i}.description`, e.target.value)
                  }
                  error={formik.errors.goals?.[i]?.description}
                />
                <Input
                  label="Commission"
                  value={goal.commission}
                  onChange={(e) =>
                    formik.setFieldValue(`goals.${i}.commission`, e.target.value)
                  }
                  error={formik.errors.goals?.[i]?.commission}
                />
                <Select
                  label="Type"
                  value={goal.commissionType}
                  onChange={(e) =>
                    formik.setFieldValue(`goals.${i}.commissionType`, e.target.value)
                  }
                  options={["fixed", "percentage"]}
                />
                {formik.values.goals.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGoal(i)}
                    className="text-red-500 mt-6"
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* STATUS & LOGO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select
              label="Status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              options={["active", "inactive"]}
            />
            <div className="">
              <label className="block text-sm font-medium mb-1">Logo</label>
              <input
                type="file"
                onChange={(e) =>
                  formik.setFieldValue("logo", e.target.files[0])
                }
                className="w-full bg-transparent border-b border-gray-600 px-2 py-2 focus:outline-none"
              />
              <p className="text-red-500 text-xs min-h-[18px]">
                {formik.errors.logo || " "}
              </p>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex flex-col items-center mt-5">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] cursor-pointer text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;

/* ---------- SMALL COMPONENTS ---------- */
const Input = ({ label, error, ...props }) => (
  <div className="">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full bg-transparent border-b border-gray-600 px-2 py-2 focus:outline-none"
    />
    <p className="text-red-500 text-xs min-h-[18px]">{error || " "}</p>
  </div>
);

const Textarea = ({ label, error, ...props }) => (
  <div className="">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      {...props}
      rows={3}
      className="w-full bg-transparent border-b border-gray-600 px-2 py-2 focus:outline-none resize-none"
    />
    <p className="text-red-500 text-xs min-h-[18px]">{error || " "}</p>
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div className="">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      {...props}
      className="w-full bg-transparent border-b border-gray-600 px-2 py-2 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <p className="text-red-500 text-xs min-h-[18px]">{error || " "}</p>
  </div>
);
