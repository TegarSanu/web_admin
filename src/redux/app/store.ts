import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "../features/darkMode/darkModeSlice";
import loadingReducer from "../features/loading/loadingSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    loading: loadingReducer,
    // reducers lain
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
