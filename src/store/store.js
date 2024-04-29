import appReducer from "./AppStore";
import { configureStore } from "@reduxjs/toolkit";
import segmentReducer from "./SegmentStore";

const store = configureStore({
    reducer: {
        segment: segmentReducer,
        app: appReducer
    }
});

export default store;