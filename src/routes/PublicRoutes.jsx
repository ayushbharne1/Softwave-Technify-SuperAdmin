import { Layout } from "lucide-react";
import Home from "../pages/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Dashboard from "../pages/module/dashboard/Dashboard";
import Project from "../pages/module/projects/Project";
import LeadManagement from "../pages/module/leadManagement/LeadManagement";
import PayoutManagement from "../pages/module/payoutManagement/PayoutManagement";
import AgentKyc from "../pages/module/agentKyc/AgentKyc";
import ReportAnalysis from "../pages/module/reportAnalysis/ReportAnalysis";
import AddProject from "../pages/module/projects/AddProject";
import InstantAccount from "../pages/module/projects/instantloan/InstantLoan";
import BNPL from "../pages/module/projects/bnpl/BNPL";
import Investment from "../pages/module/projects/investment/Investment";
import Demataccount from "../pages/module/projects/Demataccount/Demataccount";
import DematDetails from "../pages/module/projects/Demataccount/DematDetails";

import SavingAccountDetails from "../pages/module/projects/savingaccount/SavingAccountDetails";
import InstantLoanDetails from "../pages/module/projects/instantloan/InstantLoanDetails";
import BNPLdetails from "../pages/module/projects/bnpl/BNPLdetails";
import UPI from "../pages/module/projects/upi/UPI";
import BusinessAccount from "../pages/module/projects/businessac/BusinessAccount";
import PersonalLoan from "../pages/module/projects/personalLoan/PersonalLoan";
import BusinessLoan from "../pages/module/projects/businessLoan/BusinessLoan";
import InvestmentDetails from "../pages/module/projects/investment/InvestDetails";
import BusinessCardDetails from "../pages/module/projects/businessac/BusinessCardDetails";
import PersonalLoanDetails from "../pages/module/projects/personalLoan/PersonalLoanDetails";
import CreditCard from "../pages/module/projects/creditCard/CreditCard";
import CardDetails from "../pages/module/projects/creditCard/CardDetails";
import SavingAccount from "../pages/module/projects/savingaccount/SavingAccount";
import AgentManagements from "../pages/module/AgentManager/AgentManager";
import AgentFormPage from "../pages/module/AgentManager/Agentformpage";
import BusinessLoanDetails from "../pages/module/projects/businessLoan/BusinessLoanDetails";
import LeadDetails from "../pages/module/leadManagement/LeadDetails";
import Notifications from "../pages/module/notifications/Notifications";
import EligibleAgents from "../pages/module/payoutManagement/EligibleAgents";
// import GeneratePayout from "../pages/module/payoutManagement/GeneratePayout";
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
import AgentEdit from "../pages/module/AgentManager/AgentEdit";
import Vendor from "../pages/module/vendor/Vendor";
const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* project */}
          <Route path="/projects" element={<Project />} />
          <Route path="/projects/add-project" element={<AddProject />} />
          <Route path="/project/credit-card" element={<CreditCard />} />
          <Route path="/project/demat-account" element={<Demataccount />} />
          <Route path="/project/instant-loan" element={<InstantAccount />} />
          <Route path="/project/bnpl" element={<BNPL />} />
          <Route path="/project/investment-account" element={<Investment />} />
          {/* <Route path='/project/upi' element={<UPI/>}/> */}
          <Route path="/projects" element={<Project />} />
          <Route path="/project/add-project" element={<AddProject />} />
          {/* credit card */}
          <Route path="/project/credit-card" element={<CreditCard />} />
          <Route path="/project/credit-card/:id" element={<CardDetails />} />

          {/* demat account */}
          <Route path="/project/demat-account" element={<Demataccount />} />
          <Route path="/project/demat/:id" element={<DematDetails />} />

          {/* savings account */}
          <Route path="/project/savings-account" element={<SavingAccount />} />
          <Route
            path="/project/savings/:id"
            element={<SavingAccountDetails />}
          />

          {/* instant loan */}
          <Route path="/project/instant-loan" element={<InstantAccount />} />
          <Route
            path="/project/instant-loan/:id"
            element={<InstantLoanDetails />}
          />

          {/* bnpl */}
          <Route path="/project/bnpl" element={<BNPL />} />
          <Route path="/project/bnpl/:id" element={<BNPLdetails />} />

          <Route path="/project/investment-account" element={<Investment />} />
          <Route
            path="/project/investmentdetails/:id"
            element={<InvestmentDetails />}
          />

          <Route path="/project/upi" element={<UPI />} />

          <Route
            path="/project/business-account"
            element={<BusinessAccount />}
          />
          <Route
            path="/project/business-account/:id"
            element={<BusinessCardDetails />}
          />

          <Route path="/project/personal-loan" element={<PersonalLoan />} />
          <Route
            path="/project/personal-loan/:id"
            element={<PersonalLoanDetails />}
          />

          <Route path="/project/business-loan" element={<BusinessLoan />} />
          <Route
            path="/project/businessloan-details/:id"
            element={<BusinessLoanDetails />}
          />

          {/* agent */}
          {/* <Route path='/agent' element={<AgentManagement />} /> */}
          {/* <Route path="/financial" element={<FinancialProductManagement />} /> */}
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

          {/* agent */}
          <Route path="/agent" element={<AgentManagements />} />
          <Route path="/agent/form" element={<AgentFormPage />} />
          <Route path="/agent/view/:id" element={<AgentView />} />
          <Route path="/agent/edit/:id" element={<AgentEdit />} />


          {/* profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/subadminmanagement" element={<SubAdminManagement />} />
          <Route path="/subadminmanagement/add-subadmin" element={<AddSubAdmin />} />
          <Route path="/subadminmanagement/view-subadmin" element={<ViewAdmin />} />
          <Route path="/subadminmanagement/update-subadmin" element={<UpdateSubAdmin />} />

          {/* setting */}
          <Route path="/faqs" element={<Faqs />} />
          <Route path="faqs/addfaqs" element={<AddFaq />} />
          <Route path="faqs/viewfaqs/:id" element={<ViewFaq />} />
          <Route path="faqs/editfaqs/:id" element={<EditFaq />} />



          <Route path="/setting" element={<Setting />} />
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
