import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/login/loginSlice";
import otpReducer from "../slice/login/otpSlice"
import commissionReducer from "../slice/commisionManagement/commisionSlice"
import kycReducer from "../slice/kyc/kycSlice"
import agentEditReducer from "../slice/agent/agentEditSlice"
import agentStatusReducer from "../slice/agent/agentStatus"
import agentDeleteReducer from "../slice/agent/agentDeleteSlice"
import agentReducer from "../slice/agent/agentAddSlice"
import agentGetReducer from "../slice/agent/agentGetSlice"
import agentViewReducer from "../slice/agent/agentViewSlice"
import addFaq from "../slice/faq/AddfaSlice";
import faqReducer from "../slice/faq/GetFaqSlice";
import editfaqReducer from "../slice/faq/EditfaqSlice"
// import deletefaqReducer from "../slice/faq/DeletefaqSlice"
import getAllServiceReducer from "../slice/services/getAllServiceSlice"
import serviceDetailsReducer from "../slice/services/getDetails"
export const store = configureStore({
  reducer: {
    login: loginReducer,
    otp: otpReducer,

    agentKyc: kycReducer,
    commission: commissionReducer,
    
     addfaq: addFaq,
    getfaq: faqReducer,
    // delfaq: deletefaqReducer,

    editfaq: editfaqReducer,

    agent: agentReducer,

    agentEdit: agentEditReducer,
    agentGet: agentGetReducer,
    agentView: agentViewReducer,
    agentDelete: agentDeleteReducer,
    agentStatus: agentStatusReducer,

    services: getAllServiceReducer,
    serviceDetails: serviceDetailsReducer,
  },
});

export default store;


