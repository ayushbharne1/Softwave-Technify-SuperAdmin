import { configureStore } from "@reduxjs/toolkit";
// import loginReducer from "./loginSlice"; // Path sahi check kar lena
// import verifyReducer from "./verifySlice";
import loginReducer from "../slice/auth/loginSlice"
import verifyReducer from "../slice/auth/verifySlice"
import allLeadsReducer from "../slice/leadManagement/getAllLeadSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    verify: verifyReducer,
    allLeads: allLeadsReducer,
  },
});

export default store;


