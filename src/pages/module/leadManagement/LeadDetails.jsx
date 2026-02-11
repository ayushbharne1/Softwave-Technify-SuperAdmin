import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, LayoutDashboard, CheckCircle, XCircle, Mail, Phone, DollarSign, FileText, User } from "lucide-react";
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
      <div className="p-6 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Lead Data Found</h2>
          <p className="text-gray-600 mb-8">Please go back and select a valid lead</p>
          <NavLink 
            to="/leadmanagement" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <ChevronLeft size={18} />
            Back to Leads
          </NavLink>
        </div>
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
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Lead Details</h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <LayoutDashboard size={16} />
              </NavLink>
              <span className="text-white/60">›</span>
              <NavLink to="/leadmanagement" className="flex items-center gap-1 hover:text-white transition-colors">
                Lead Management
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">LEAD-{lead.leadId}</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">Lead ID: {lead.leadId}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lead Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{lead.name}</h2>
              <p className="text-gray-600 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {lead.productId.projectType}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-xl">
              <StatusBadge status={lead.status} />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="font-medium text-gray-800">{lead.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-800">+91 {lead.phone}</p>
              </div>
            </div>

            <div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Product Type</p>
                <p className="font-medium text-gray-800">{lead.productId.projectType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Payout Amount</p>
                <p className="font-medium text-gray-800">₹{lead.payout.amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Lead ID</p>
                <p className="font-mono font-medium text-gray-800 bg-blue-50 px-3 py-1 rounded-lg inline-block text-sm">
                  {lead.leadId}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
            >
              <ChevronLeft size={18} />
              Back to Leads
            </button>
          </div>
        </div>

        {/* Status Update Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Update Lead Status</h3>
            <p className="text-gray-600">Change lead status and add reason for update</p>
          </div>

          <Formik
            initialValues={{ status: lead.status, reason: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <div className="relative">
                    <select
                      value={values.status}
                      onChange={(e) =>
                        setFieldValue("status", e.target.value)
                      }
                      disabled={isSubmitting}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm appearance-none"
                    >
                      {statusOptions.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Reason <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    name="reason"
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm resize-vertical"
                    placeholder="Enter reason for status change..."
                  />
                  <ErrorMessage
                    name="reason"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Update Lead Status
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
