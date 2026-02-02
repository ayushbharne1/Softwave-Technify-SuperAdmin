
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import StatusBadge from "./StatusBadge";

const STATUS_TRANSITIONS = {
  new: ["approved", "rejected"],
  approved: ["paid", "rejected"],
  rejected: [],
  paid: [],
};

export default function LeadDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const lead = location.state?.lead;

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No Lead Data Found
      </div>
    );
  }

  const validationSchema = Yup.object({
    status: Yup.string().required(),
    reason: Yup.string().required("Reason is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (
      !STATUS_TRANSITIONS[lead.status].includes(values.status) &&
      values.status !== lead.status
    ) {
      toast.error("Invalid status transition");
      setSubmitting(false);
      return;
    }

    toast.success(`Lead updated to ${values.status.toUpperCase()}`);
    setSubmitting(false);
    navigate(-1);
  };

  const statusOptions = [
    { label: lead.status.toUpperCase(), value: lead.status },
    ...STATUS_TRANSITIONS[lead.status].map((s) => ({
      label: s.toUpperCase(),
      value: s,
    })),
  ];

  return (
    <div className="min-h-screen mt-6 bg-gray-100">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-white">Lead Details</h1>

        <div className="text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/leadmanagement">Lead Management</NavLink>
          <span>&gt;</span>
          <span>Lead Details</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-2xl shadow-lg">
        {/* INFO */}
        <div className="lg:w-1/2 space-y-3">
          <h2 className="font-semibold text-lg">Lead Information</h2>
          {[
            ["Customer Name", lead.name],
            ["Mobile Number", lead.phone],
            ["Product", lead.productId.projectType],
            ["Amount", `₹${lead.payout.amount}`],
            ["Lead ID", lead.leadId],
            ["Current Status", <StatusBadge status={lead.status} />],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between border-b pb-2">
              <span className="text-gray-400">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="lg:w-1/2">
          <h2 className="font-semibold text-lg mb-4">Update Lead Status</h2>

          <Formik
            initialValues={{ status: lead.status, reason: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-4">
                <div>
                  <label className="text-xs uppercase text-gray-400">
                    Status
                  </label>
                  <select
                    value={values.status}
                    onChange={(e) =>
                      setFieldValue("status", e.target.value)
                    }
                    className="w-full border px-3 py-2 rounded"
                  >
                    {statusOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase text-gray-400">
                    Reason
                  </label>
                  <Field
                    as="textarea"
                    name="reason"
                    rows={4}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <ErrorMessage
                    name="reason"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white px-6 py-2 rounded"
                >
                  Update Status
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
