import { createSlice } from "@reduxjs/toolkit";
import { myStatsSteps } from "../components/TourSteps";
export const uiTour = createSlice({
    name: "uiTour",
    initialState: {
        run: true,
        stepIndex: 0,
        steps: myStatsSteps,
        tourActive: false,
        status: "idle",
        error: null,
    },
    reducers: {
        setTourSteps: (state, action) => {
            state.steps = action.payload
        },
        setTourStepIndex: (state, action) => {
            state.stepIndex = action.payload
        },
        setTourActive: (state, action) => {
            state.tourActive = action.payload
        },
        setTourRun: (state, action) => {
            state.run = action.payload
        },

    },
    extraReducers: (builder) => { }

});
export const { setTourSteps, setTourRun, setTourStepIndex, setTourActive } = uiTour.actions;
export default uiTour.reducer