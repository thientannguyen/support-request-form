import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { SupportRequestFormData } from "../models";
import formReducer from "../store/formSlice";
import ConfirmationPage from "./ConfirmationPage";

// Helper function to render component with providers
const renderWithProviders = (
  component: React.ReactElement,
  formState?: {
    submissions: SupportRequestFormData[];
    currentSubmission: SupportRequestFormData | null;
  }
) => {
  const store = configureStore({
    reducer: {
      form: formReducer,
    },
    preloadedState: formState ? { form: formState } : undefined,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("ConfirmationPage", () => {
  const mockSubmission: SupportRequestFormData = {
    issueType: "bugReport",
    fullName: "Michael",
    email: "michael@example.com",
    tags: ["ui", "performance"],
    stepsToReproduce: [{ step: "Step 1" }, { step: "Step 2" }],
  };

  describe("when no submission exists", () => {
    it("displays no submission message", () => {
      renderWithProviders(<ConfirmationPage />);

      expect(screen.getByText("No submission found")).toBeInTheDocument();
    });

    it("displays link to submit a request", () => {
      renderWithProviders(<ConfirmationPage />);

      const link = screen.getByRole("link", { name: "Go to Form" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });
  });

  describe("when submission exists", () => {
    const formState = {
      submissions: [mockSubmission],
      currentSubmission: mockSubmission,
    };

    it("displays confirmation title", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      expect(screen.getByText("Support Request Submitted")).toBeInTheDocument();
      expect(
        screen.getByText("Thank you for your submission!")
      ).toBeInTheDocument();
    });

    it("displays user's full name", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      expect(screen.getByText("Full Name:")).toBeInTheDocument();
      expect(screen.getByText("Michael")).toBeInTheDocument();
    });

    it("displays user's email", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      expect(screen.getByText("Email:")).toBeInTheDocument();
      expect(screen.getByText("michael@example.com")).toBeInTheDocument();
    });

    it("displays issue type", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      expect(screen.getByText("Issue Type:")).toBeInTheDocument();
      expect(screen.getByText("Bug Report")).toBeInTheDocument();
    });

    it("displays tags", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      expect(screen.getByText("Tags:")).toBeInTheDocument();
      expect(screen.getByText("UI, Performance")).toBeInTheDocument();
    });

    it("displays steps to reproduce", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      expect(screen.getByText("Steps to Reproduce:")).toBeInTheDocument();
      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
    });

    it("displays link to submit another request", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      const link = screen.getByRole("link", { name: "Submit Another Request" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });
  });

  describe("accessibility", () => {
    const formState = {
      submissions: [mockSubmission],
      currentSubmission: mockSubmission,
    };

    it("has proper heading structure", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveTextContent("Support Request Submitted");

      const h2 = screen.getByRole("heading", { level: 2 });
      expect(h2).toHaveTextContent("Thank you for your submission!");
    });

    it("has accessible links", () => {
      renderWithProviders(<ConfirmationPage />, formState);

      const link = screen.getByRole("link", { name: "Submit Another Request" });
      expect(link).toHaveAttribute("href", "/");
    });
  });
});
