import { Layout } from "lucide-react";
import Home from "../pages/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Dashboard from "../pages/module/dashboard/Dashboard";
import LeadManagement from "../pages/module/leadManagement/LeadManagement";
import PayoutManagement from "../pages/module/payoutManagement/PayoutManagement";
import AgentKyc from "../pages/module/agentKyc/AgentKyc";
import ReportAnalysis from "../pages/module/reportAnalysis/ReportAnalysis";
import AgentManagements from "../pages/module/AgentManager/AgentManager";
import LeadDetails from "../pages/module/leadManagement/LeadDetails";
import Notifications from "../pages/module/notifications/Notifications";
import EligibleAgents from "../pages/module/payoutManagement/EligibleAgents";
import PayoutHistory from "../pages/module/payoutManagement/PayoutHistory";
import Login from "../components/Signup/Login";
import VerifyOtp from "../components/Signup/verifyotp";
// import ForgetPassword from "../components/Signup/Forget_Password";
// import ResetPassword from "../components/Signup/Reset_passoward";
import Profile from "../pages/module/profile/Profile";
import EditProfile from "../pages/module/profile/EditProfile";
import SubAdminManagement from "../pages/module/subadminManagement/SubAdminManagement";
import AddSubAdmin from "../pages/module/subadminManagement/AddSubAdmin";
import ViewAdmin from "../pages/module/subadminManagement/Viewadmin";
import UpdateSubAdmin from "../pages/module/subadminManagement/UpdateSubAdmin";
import { Setting } from "../pages/module/setting/Setting";
import Faqs from "../pages/module/faqs/Faqs";
import AddFaq from "../pages/module/faqs/AddFaqs";
import ViewFaq from "../pages/module/faqs/ViewFaqs";
import EditFaq from "../pages/module/faqs/EditFaqs";
import CommissionManagement from "../pages/module/commisionManagement/CommisionManagement";
import AgentView from "../pages/module/AgentManager/AgentView";
import ViewKyc from "../pages/module/agentKyc/Viewkyc";
import Vendor from "../pages/module/vendor/Vendor";
import Services from "../pages/module/services/Services";
import ServiceDetails from "../pages/module/services/ServiceDetails";
import AddService from "../pages/module/services/AddService";
import VendorDetails from "../pages/module/vendor/VendorDetails";
import UpdateSetting from "../pages/module/setting/UpdateSetting";
const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Services start from here */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/addservice" element={<AddService/>} />
           <Route path="/services/:id" element={<ServiceDetails />} />

           

          <Route path="/leadmanagement" element={<LeadManagement />} />
          <Route path="/leadmanagement/lead-details/:leadId" element={<LeadDetails />} />

          {/* <Route path="/financial" element={<Financials />} /> */}
          <Route path="/commision" element={<CommissionManagement />} />

          {/* payout */}

          <Route path="/payout" element={<PayoutManagement />}>
            <Route index element={<EligibleAgents />} />
            <Route path="eligible-agents" element={<EligibleAgents />} />
            {/* <Route path="generate" element={<GeneratePayout />} /> */}
            <Route path="history" element={<PayoutHistory />} />
          </Route>

          <Route path="/agentkyc" element={<AgentKyc />} />
          <Route path="/agentkyc/viewkyc/:id" element={<ViewKyc />} />
          <Route path="/reportanalysis" element={<ReportAnalysis />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Vendor */}
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/vendors/view/:id"element={<VendorDetails/>} />

          {/* agent */}
          <Route path="/agent" element={<AgentManagements />} />
          <Route path="/agent/view/:id" element={<AgentView />} />


          {/* profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/subadminmanagement" element={<SubAdminManagement />} />
          <Route path="/subadminmanagement/add-subadmin" element={<AddSubAdmin />} />
          <Route path="/subadminmanagement/view-subadmin" element={<ViewAdmin />} />
          <Route path="/subadminmanagement/update-subadmin" element={<UpdateSubAdmin />} />

          {/* setting */}
          <Route path="/faqs" element={<Faqs />} />
          <Route path="faqs/add" element={<AddFaq />} />
          <Route path="faqs/view/:id" element={<ViewFaq />} />
          <Route path="faqs/edit/:id" element={<EditFaq />} />



          <Route path="/setting" element={<Setting />} />
          <Route path="/setting/update-setting" element={<UpdateSetting/>} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* <Route path="forgetpassword" element={<ForgetPassword></ForgetPassword>} />
        <Route path="/reset-password" element={<ResetPassword></ResetPassword>} /> */}



      </Routes>

    </>
  );
};

export default PublicRoutes;
