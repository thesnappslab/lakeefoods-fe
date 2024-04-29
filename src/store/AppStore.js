import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        pageMessage: {show: false, message: "", variant: ""},
        loading: false
    },
    reducers: {
        setPageMessage: (state, action)=>{
            state.pageMessage= action.payload;
        },
        setLoading: (state, action)=>{
            state.loading= action.payload;
        }
    }
})
export const { setPageMessage, setLoading } = appSlice.actions;
export default appSlice.reducer;