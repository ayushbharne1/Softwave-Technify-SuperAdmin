import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import StatusBadge from "./StatusBadge";
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";
import { fetchLeadDetails, clearLeadDetails } from "../../../redux/slice/leads/leadDetailsSlice";
import { updateLeadStatus } from "../../../redux/slice/leads/leadManagement";

const STATUS_TRANSITIONS = {
  new: ["approved", "rejected"],
  approved: ["paid", "rejected"],
  rejected: [],
  paid: [],
};

export default function LeadDetails() {
  const { leadId } = useParams();
  const location = useLocation();
  const leadMongoId = location.state?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { lead, loading, error } = useSelector((state) => state.leadDetails);

  useEffect(() => {
    if (leadId) dispatch(fetchLeadDetails(leadId));
    return () => dispatch(clearLeadDetails());
  }, [dispatch, leadId]);

  if (loading) return <div className="flex items-center justify-center"><LoaderSpinner /></div>;
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <p className="text-red-500">{error}</p>
      <button
        onClick={() => dispatch(fetchLeadDetails(leadId))}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  );
  if (!lead) return null;

  const validationSchema = Yup.object({
    status: Yup.string().required("Status is required"),
    reason: Yup.string().required("Reason is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!STATUS_TRANSITIONS[lead.status].includes(values.status) && values.status !== lead.status) {
        toast.error("Invalid status transition.");
        return;
      }

      const payload = { leadId: leadMongoId, status: values.status, reason: values.reason };
      const resultAction = await dispatch(updateLeadStatus(payload));

      if (updateLeadStatus.fulfilled.match(resultAction)) {
        toast.success(`Lead status updated to ${values.status.toUpperCase()}`);
        navigate(-1);
      } else {
        toast.error(resultAction.payload || "Failed to update lead status");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const statusOptions = [
    { label: lead.status.toUpperCase(), value: lead.status },
    ...STATUS_TRANSITIONS[lead.status].map((s) => ({ label: s.toUpperCase(), value: s })),
  ];

  return (
    <div className="min-h-screen mt-6 bg-gray-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-white">Lead Details</h1>
        <div className="text-[15px] text-white flex items-center mt-2 gap-2">
          <NavLink to="/dashboard" className="flex hover:text-blue-600 transition items-center gap-1"><LayoutDashboard size={16} /></NavLink>
          <span>&gt;</span>
          <NavLink to="/leadmanagement" className="hover:text-blue-600 transition">Lead Management</NavLink>
          <span>&gt;</span>
          <span className="opacity-80">Lead Details</span>
        </div>
      </div>

      {/* MAIN LAYOUT: LEFT INFO + RIGHT FORM */}
      <div className="flex flex-col bg-white shadow-lg p-6 rounded-2xl lg:flex-row gap-6">

        {/* LEFT COLUMN: Lead Info */}
        <div className="lg:w-1/2 bg-white p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Lead Information</h2>
          {[
            { label: "Customer Name", value: lead?.name || "-" },
            { label: "Mobile Number", value: lead?.phone || "-" },
            { label: "Product", value: lead?.productId?.projectType || "-" },
            { label: "Amount", value: `₹${lead.payout?.amount ?? 0}` },
            { label: "Lead ID", value: lead?.leadId || "-" },
            { label: "Current Status", value: <StatusBadge status={lead.status} /> },
          ].map((item, i) => (
            <div key={i} className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-base font-semibold text-gray-800">{item?.value || "-"}</span>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Update Form */}
        <div className="lg:w-1/2 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Update Lead Status</h2>
          <Formik
            initialValues={{ status: lead.status, reason: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-4">
                {/* STATUS */}
                <div>
                  <label className="block text-xs text-gray-400 uppercase mb-1">Status</label>
                  <select
                    value={values.status}
                    onChange={(e) => setFieldValue("status", e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="status"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* REASON */}
                <div>
                  <label className="block text-xs text-gray-400 uppercase mb-1">Reason</label>
                  <Field
                    as="textarea"
                    rows={4}
                    placeholder="Enter reason"
                    name="reason"
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <ErrorMessage
                    name="reason"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* SUBMIT */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white px-6 py-2 rounded-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Updating..." : "Update Status"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

      </div>
    </div>
  );
}
