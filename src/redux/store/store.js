import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/login/loginSlice";
import otpReducer from "../slice/login/otpSlice"
import payoutDashboardReducer from "../slice/payoutDashboard/payDashboardSlice"
import payoutHistoryReducer from "../slice/payoutDashboard/payoutHistorySlice"
import commissionReducer from "../slice/commisionManagement/commisionSlice"
import agentReducer from "../slice/agent/agentAddSlice"
import agentGetReducer from "../slice/agent/agentGetSlice"
import agentViewReducer from "../slice/agent/agentViewSlice"
import kycReducer from "../slice/kyc/kycSlice"
import agentEditReducer from "../slice/agent/agentEditSlice"
import agentStatusReducer from "../slice/agent/agentStatus"
import agentDeleteReducer from "../slice/agent/agentDeleteSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    otp: otpReducer,
    payoutDashboard: payoutDashboardReducer,
    payoutHistory: payoutHistoryReducer,

    agentKyc: kycReducer,
    commission: commissionReducer,


    agent: agentReducer,

    agentEdit: agentEditReducer,
    agentGet: agentGetReducer,
    agentView: agentViewReducer,
    agentDelete: agentDeleteReducer,
    agentStatus: agentStatusReducer,
  },
});

export default store;


