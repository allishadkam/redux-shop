import { configureStore } from "@reduxjs/toolkit";
import uislice from "./ui-slice";

const store = configureStore({
    reducer:{ ui : uislice.reducer , }
});

export default store;