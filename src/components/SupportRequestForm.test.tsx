import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import formReducer from "../store/formSlice";
import SupportRequestForm from "./SupportRequestForm";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper function to render component with providers
const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      form: formReducer,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("SupportRequestForm", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders form elements correctly", () => {
    renderWithProviders(<SupportRequestForm />);

    expect(screen.getByText("Support Request Form")).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/issue type/i)).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument(); // Check for Tags heading
    expect(screen.getByText(/steps to reproduce/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("displays validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SupportRequestForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Full name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(
        screen.getByText("Please select an issue type")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please select at least one tag")
      ).toBeInTheDocument();
    });
  });

  it("displays validation error for invalid email", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SupportRequestForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "aa@a");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("allows user to select tags", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SupportRequestForm />);

    const uiTag = screen.getByLabelText("UI");
    const performanceTag = screen.getByLabelText("Performance");

    expect(uiTag).not.toBeChecked();
    expect(performanceTag).not.toBeChecked();

    await user.click(uiTag);
    await user.click(performanceTag);

    expect(uiTag).toBeChecked();
    expect(performanceTag).toBeChecked();
  });

  it("allows user to add and remove steps to reproduce", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SupportRequestForm />);

    const stepInputs = screen.getAllByPlaceholderText(/step \d+/i);
    expect(stepInputs).toHaveLength(1);

    const addButton = screen.getByRole("button", { name: /add step/i });
    await user.click(addButton);

    const updatedStepInputs = screen.getAllByPlaceholderText(/step \d+/i);
    expect(updatedStepInputs).toHaveLength(2);

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    expect(removeButtons).toHaveLength(1);
    await user.click(removeButtons[0]);

    const finalStepInputs = screen.getAllByPlaceholderText(/step \d+/i);
    expect(finalStepInputs).toHaveLength(1);
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SupportRequestForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), "Michael");
    await user.type(screen.getByLabelText(/email/i), "michael@example.com");

    const issueTypeSelect = screen.getByLabelText(/issue type/i);
    await user.selectOptions(issueTypeSelect, "bugReport");

    await user.click(screen.getByLabelText("UI"));

    const stepInput = screen.getByPlaceholderText(/step 1/i);
    await user.type(stepInput, "Click the submit button");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    // Should navigate to confirmation page
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/confirmation");
    });
  });

  it("displays all issue type options", () => {
    renderWithProviders(<SupportRequestForm />);

    expect(
      screen.getByRole("option", { name: "Select an issue type" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Bug Report" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Feature Request" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "General Inquiry" })
    ).toBeInTheDocument();
  });

  it("displays all tag options", () => {
    renderWithProviders(<SupportRequestForm />);

    expect(screen.getByLabelText("UI")).toBeInTheDocument();
    expect(screen.getByLabelText("Backend")).toBeInTheDocument();
    expect(screen.getByLabelText("Performance")).toBeInTheDocument();
    expect(screen.getByLabelText("Security")).toBeInTheDocument();
  });

  it("validates maximum length for full name", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SupportRequestForm />);

    const fullNameInput = screen.getByLabelText(/full name/i);
    const longName = "a".repeat(101);

    await user.type(fullNameInput, longName);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Full name must be at most 100 characters")
      ).toBeInTheDocument();
    });
  });
});
