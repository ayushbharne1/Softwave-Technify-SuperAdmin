import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/login/loginSlice";
import otpReducer from "../slice/login/otpSlice"
import settingReducer from "../slice/setting/settingSlice"
import payoutDashboardReducer from "../slice/payoutDashboard/payDashboardSlice"
import payoutHistoryReducer from "../slice/payoutDashboard/payoutHistorySlice"
import addFaq from "../slice/faq/AddFaqSlice";
import deletefaqReducer from "../slice/faq/DeleteFaqSlice";
import faqReducer from "../slice/faq/GetFaqSlice";
import editfaqReducer from "../slice/faq/EditfaqSlice";
import commissionReducer from "../slice/commisionManagement/commisionSlice"
import agentReducer from "../slice/agent/agentAddSlice"
import agentGetReducer from "../slice/agent/agentGetSlice"
import agentViewReducer from "../slice/agent/agentViewSlice"
import leadsReducer from "../slice/leads/leadManagement";
import leadDetailsReducer from "../slice/leads/leadDetailsSlice"
import kycReducer from "../slice/kyc/kycSlice"
import agentEditReducer from "../slice/agent/agentEditSlice"
import agentStatusReducer from "../slice/agent/agentStatus"
import agentDeleteReducer from "../slice/agent/agentDeleteSlice"
import projectReducer from "../slice/project/projectSlice";
import getprojectreducer from "../slice/project/getprojectSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    otp: otpReducer,
    payoutDashboard: payoutDashboardReducer,
    payoutHistory: payoutHistoryReducer,

    setting: settingReducer,
    addfaq: addFaq,
    getfaq: faqReducer,
    delfaq: deletefaqReducer,

    editfaq: editfaqReducer,
    leads: leadsReducer,
    leadDetails: leadDetailsReducer,
    agentKyc: kycReducer,
    commission: commissionReducer,

    project: projectReducer,

    agent: agentReducer,

    agentEdit: agentEditReducer,
    agentGet: agentGetReducer,
    agentView: agentViewReducer,
    agentDelete: agentDeleteReducer,
    agentStatus: agentStatusReducer,
    getproject: getprojectreducer,
  },
});

export default store;


