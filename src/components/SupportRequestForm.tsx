import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  issueTypeOptions,
  tagOptions,
  type SupportRequestFormData,
} from "../models";
import { submitForm } from "../store/formSlice";
import supportFormSchema from "../utils/schema";

const SupportRequestForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stepsToReproduce",
  });

  const onSubmit = (data: SupportRequestFormData) => {
    dispatch(submitForm(data));
    navigate("/confirmation");
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
          <label className="block text-gray-700 font-semibold mb-2">Tags</label>
          <div className="flex flex-wrap gap-3">
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

        <div className="mb-3">
          <label className="block text-gray-700 font-semibold mb-2">
            Steps to Reproduce
          </label>
          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={field.id} className="mb-2">
                <div className="flex gap-2">
                  <input
                    placeholder={`Step ${index + 1}`}
                    {...register(`stepsToReproduce.${index}.step`)}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.stepsToReproduce?.[index]?.step
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="px-3 py-2 rounded cursor-pointer font-semibold border-0 bg-red-500 text-white"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                {errors.stepsToReproduce?.[index]?.step && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.stepsToReproduce[index].step.message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              className="px-3 py-2 max-w-24 rounded cursor-pointer font-semibold border-0 bg-green-500 text-white mt-2"
              onClick={() => append({ step: "" })}
            >
              Add Step
            </button>
          </div>
          {errors.stepsToReproduce && (
            <p className="text-red-500 text-sm mt-1">
              {errors.stepsToReproduce.message}
            </p>
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
