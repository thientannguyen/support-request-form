import React from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

const FormField = React.memo(
  ({ label, htmlFor, error, children }: FormFieldProps) => {
    return (
      <div className="mb-3">
        <label
          htmlFor={htmlFor}
          className="mb-2 block font-semibold text-gray-700"
        >
          {label}
        </label>
        {children}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
