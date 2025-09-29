import { configureStore } from "@reduxjs/toolkit";
import type { SupportRequestFormData } from "../models";
import formReducer, {
  clearCurrentSubmission,
  selectCurrentSubmission,
  selectSubmissions,
  submitForm,
} from "./formSlice";

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      form: formReducer,
    },
  });
};

const mockFormData: SupportRequestFormData = {
  fullName: "Michael",
  email: "michael@example.com",
  issueType: "bugReport",
  tags: ["ui", "performance"],
  stepsToReproduce: [{ step: "Step 1" }, { step: "Step 2" }],
};

describe("Form slice", () => {
  it("should have initial state", () => {
    const store = createTestStore();
    const state = store.getState();

    expect(state.form.submissions).toEqual([]);
    expect(state.form.currentSubmission).toBeNull();
  });

  it("should handle submitForm action", () => {
    const store = createTestStore();

    store.dispatch(submitForm(mockFormData));
    const state = store.getState();

    expect(state.form.submissions).toHaveLength(1);
    expect(state.form.submissions[0]).toEqual(mockFormData);
    expect(state.form.currentSubmission).toEqual(mockFormData);
  });

  it("should handle multiple form submissions", () => {
    const store = createTestStore();

    const secondSubmission = {
      ...mockFormData,
      fullName: "Jane",
      email: "jane@example.com",
    };

    store.dispatch(submitForm(mockFormData));
    store.dispatch(submitForm(secondSubmission));

    const state = store.getState();

    expect(state.form.submissions).toHaveLength(2);
    expect(state.form.submissions[0]).toEqual(mockFormData);
    expect(state.form.submissions[1]).toEqual(secondSubmission);
    expect(state.form.currentSubmission).toEqual(secondSubmission);
  });

  it("should handle clearCurrentSubmission action", () => {
    const store = createTestStore();

    // submit a form
    store.dispatch(submitForm(mockFormData));
    let state = store.getState();
    expect(state.form.currentSubmission).toEqual(mockFormData);

    // clear current submission
    store.dispatch(clearCurrentSubmission());
    state = store.getState();

    expect(state.form.currentSubmission).toBeNull();
    expect(state.form.submissions).toHaveLength(1); // submissions should remain unchanged
  });

  describe("Selectors", () => {
    it("should select submissions correctly", () => {
      const store = createTestStore();
      store.dispatch(submitForm(mockFormData));

      const state = store.getState();
      const submissions = selectSubmissions(state);

      expect(submissions).toHaveLength(1);
      expect(submissions[0]).toEqual(mockFormData);
    });

    it("should select current submission correctly", () => {
      const store = createTestStore();
      store.dispatch(submitForm(mockFormData));

      const state = store.getState();
      const currentSubmission = selectCurrentSubmission(state);

      expect(currentSubmission).toEqual(mockFormData);
    });

    it("should return null for current submission when cleared", () => {
      const store = createTestStore();
      store.dispatch(submitForm(mockFormData));
      store.dispatch(clearCurrentSubmission());

      const state = store.getState();
      const currentSubmission = selectCurrentSubmission(state);

      expect(currentSubmission).toBeNull();
    });
  });
});
