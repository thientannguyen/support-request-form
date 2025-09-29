import { describe, expect, it } from "vitest";
import supportFormSchema from "./schema";

describe("Support Form Schema", () => {
  it("should validate a correct form data", () => {
    const validData = {
      fullName: "Michael",
      email: "michael@example.com",
      issueType: "bugReport",
      tags: ["ui", "performance"],
      stepsToReproduce: [{ step: "Step 1" }, { step: "Step 2" }],
    };

    const result = supportFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail if full name is empty", () => {
    const invalidData = {
      fullName: "",
      email: "michael@example.com",
      issueType: "bugReport",
      tags: ["ui", "performance"],
      stepsToReproduce: [{ step: "Step 1" }, { step: "Step 2" }],
    };

    const result = supportFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Full name is required");
    }
  });

  it("should validate full name length constraints", () => {
    const longName = "a".repeat(101);
    const invalidData = {
      fullName: longName,
      email: "michael@example.com",
      issueType: "bugReport",
      tags: ["ui", "performance"],
      stepsToReproduce: [{ step: "Step 1" }, { step: "Step 2" }],
    };

    const result = supportFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Full name must be at most 100 characters"
      );
    }
  });

  it("should fail if email is invalid", () => {
    const invalidData = {
      fullName: "Michael",
      email: "invalid-email",
      issueType: "bugReport",
      tags: ["ui", "performance"],
      stepsToReproduce: [{ step: "Step 1" }, { step: "Step 2" }],
    };

    const result = supportFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email address");
    }
  });

  it("should fail if issue type is not selected", () => {
    const invalidData = {
      fullName: "Michael",
      email: "michael@example.com",
      issueType: "",
      tags: ["ui", "performance"],
      stepsToReproduce: [{ step: "Step 1" }, { step: "Step 2" }],
    };

    const result = supportFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Please select an issue type"
      );
    }
  });

  it("should fail if at least one tag is not selected", () => {
    const invalidData = {
      fullName: "Michael",
      email: "michael@example.com",
      issueType: "bugReport",
      tags: [],
      stepsToReproduce: [{ step: "Step 1" }, { step: "Step 2" }],
    };

    const result = supportFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Please select at least one tag"
      );
    }
  });

  it("should fail if at least one step is not provided", () => {
    const invalidData = {
      fullName: "Michael",
      email: "michael@example.com",
      issueType: "bugReport",
      tags: ["ui", "performance"],
      stepsToReproduce: [],
    };

    const result = supportFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Please add at least one step to reproduce"
      );
    }
  });
});
