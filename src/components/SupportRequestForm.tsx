import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import supportFormSchema from "../utils/schema";
import type { SupportRequestFormData } from "../models";

const issueTypeOptions = [
  { value: "bugReport", label: "Bug Report" },
  { value: "featureRequest", label: "Feature Request" },
  { value: "generalInquiry", label: "General Inquiry" },
];

const tagOptions = [
  { value: "ui", label: "UI" },
  { value: "backend", label: "Backend" },
  { value: "performance", label: "Performance" },
  { value: "security", label: "Security" },
];

const SupportRequestForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      issueType: "",
      tags: [],
      stepsToReproduce: [{ step: "" }],
    },
  });

  const onSubmit = (data: SupportRequestFormData) => {
    console.log(data);
  };

  return (
    <div className="max-w-[600px] mx-auto p-5 sm:p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-center mb-5 text-gray-800 text-4xl font-bold">
        Support Request Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="issueType"
            className="block text-gray-700 font-semibold mb-2"
          >
            Issue Type
          </label>
          <select
            id="issueType"
            {...register("issueType")}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.issueType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select an issue type</option>
            {issueTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.issueType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.issueType.message}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label>Tags</label>
          <div className="flex flex-wrap gap-4">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <>
                  {tagOptions.map((tag) => (
                    <div key={tag.value} className="flex items-center mr-5">
                      <input
                        type="checkbox"
                        id={`tag-${tag.value}`}
                        value={tag.value}
                        checked={field.value.includes(tag.value)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = e.target.value;
                          const newValue = checked
                            ? [...field.value, value]
                            : field.value.filter((val) => val !== value);
                          field.onChange(newValue);
                        }}
                      />
                      <label htmlFor={`tag-${tag.value}`} className="ml-2">
                        {tag.label}
                      </label>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-3 py-3 bg-blue-600 text-white rounded text-base font-semibold cursor-pointer transition-colors duration-300 hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default SupportRequestForm;
