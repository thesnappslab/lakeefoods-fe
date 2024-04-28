import { createSlice } from "@reduxjs/toolkit";

const segmentSlice = createSlice({
    name: 'segment',
    initialState: {
        segments: []
    },
    reducers: {
        storeSegments: (state, action) => {
            state.segments= action.payload;
        },
        addSegmentToStore: (state, action) => {
            state.segments= [...state.segments, action.payload]
        },
        editSegmentInStore: (state, action) => {
            state.segments= state.segments.map((item)=>{
                if(item._id === action.payload._id){
                    return action.payload
                }else{
                    return item
                }
            })
        },
        deleteSegmentInStore: (state, action) => {
            state.segments= state.segments.filter(item => {
                return item._id !== action.payload
            })
        }
    }
})
export const { storeSegments, addSegmentToStore, editSegmentInStore, deleteSegmentInStore } = segmentSlice.actions;
export default segmentSlice.reducer;