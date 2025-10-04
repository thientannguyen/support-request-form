import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface StepInputProps {
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  showRemoveButton: boolean;
  onRemove: () => void;
}

const StepInput = React.memo(
  ({
    placeholder,
    register,
    error,
    showRemoveButton,
    onRemove,
  }: StepInputProps) => {
    return (
      <div className="mb-2">
        <div className="flex gap-2">
          <input
            placeholder={placeholder}
            {...register}
            className={`w-full rounded-md border px-3 py-2 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {showRemoveButton && (
            <button
              type="button"
              className="cursor-pointer rounded border-0 bg-red-500 px-3 py-2 font-semibold text-white"
              onClick={onRemove}
            >
              Remove
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

StepInput.displayName = "StepInput";

export default StepInput;
