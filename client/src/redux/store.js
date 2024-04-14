import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import regSlice from "./regSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        reg: regSlice
    }
})