import { createSlice } from "@reduxjs/toolkit";
import type { SupportRequestFormData } from "../models";
import type { RootState } from "./index";

interface FormState {
  submissions: SupportRequestFormData[];
  currentSubmission: SupportRequestFormData | null;
}

const initialState: FormState = {
  submissions: [],
  currentSubmission: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    submitForm: (state, action: { payload: SupportRequestFormData }) => {
      state.submissions.push(action.payload);
      state.currentSubmission = action.payload;
    },
    clearCurrentSubmission: (state) => {
      state.currentSubmission = null;
    },
  },
});

export const { submitForm, clearCurrentSubmission } = formSlice.actions;

//selectors
export const selectSubmissions = (state: RootState) => state.form.submissions;
export const selectCurrentSubmission = (state: RootState) =>
  state.form.currentSubmission;

export default formSlice.reducer;
