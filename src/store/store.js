import { configureStore } from "@reduxjs/toolkit";
import segmentReducer from "./SegmentStore";

const store = configureStore({
    reducer: {
        segment: segmentReducer,
    }
});

export default store;