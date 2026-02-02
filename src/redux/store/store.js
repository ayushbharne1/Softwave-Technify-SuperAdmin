import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/login/loginSlice";
import otpReducer from "../slice/login/otpSlice"
import commissionReducer from "../slice/commisionManagement/commisionSlice"
import kycReducer from "../slice/kyc/kycSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    otp: otpReducer,

    agentKyc: kycReducer,
    commission: commissionReducer,


  },
});

export default store;


