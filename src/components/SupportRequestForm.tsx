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
    <div className="mx-auto max-w-[600px] rounded-lg bg-gray-50 p-5 shadow-md sm:p-4">
      <h1 className="mb-5 text-center text-4xl font-bold text-gray-800">
        Support Request Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label
            htmlFor="fullName"
            className="mb-2 block font-semibold text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="email"
            className="mb-2 block font-semibold text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="issueType"
            className="mb-2 block font-semibold text-gray-700"
          >
            Issue Type
          </label>
          <select
            id="issueType"
            {...register("issueType")}
            className={`w-full rounded-md border px-3 py-2 ${
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
            <p className="mt-1 text-sm text-red-500">
              {errors.issueType.message}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label className="mb-2 block font-semibold text-gray-700">Tags</label>
          <div className="flex flex-wrap gap-3">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <>
                  {tagOptions.map((tag) => (
                    <div key={tag.value} className="mr-5 flex items-center">
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
            <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="mb-2 block font-semibold text-gray-700">
            Steps to Reproduce
          </label>
          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={field.id} className="mb-2">
                <div className="flex gap-2">
                  <input
                    placeholder={`Step ${index + 1}`}
                    {...register(`stepsToReproduce.${index}.step`)}
                    className={`w-full rounded-md border px-3 py-2 ${
                      errors.stepsToReproduce?.[index]?.step
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="cursor-pointer rounded border-0 bg-red-500 px-3 py-2 font-semibold text-white"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                {errors.stepsToReproduce?.[index]?.step && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.stepsToReproduce[index].step.message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-2 max-w-24 cursor-pointer rounded border-0 bg-green-500 px-3 py-2 font-semibold text-white"
              onClick={() => append({ step: "" })}
            >
              Add Step
            </button>
          </div>
          {errors.stepsToReproduce && (
            <p className="mt-1 text-sm text-red-500">
              {errors.stepsToReproduce.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded bg-blue-600 px-3 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default SupportRequestForm;
