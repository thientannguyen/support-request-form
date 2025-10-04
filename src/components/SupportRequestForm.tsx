import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo } from "react";
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
import FormField from "./FormField";
import StepInput from "./StepInput";
import TagCheckbox from "./TagCheckbox";

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

  // Memoize form submission handler to prevent unnecessary re-renders
  const onSubmit = useCallback(
    (data: SupportRequestFormData) => {
      dispatch(submitForm(data));
      navigate("/confirmation");
    },
    [dispatch, navigate]
  );

  const createRemoveHandler = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

  const handleAddStep = useCallback(() => {
    append({ step: "" });
  }, [append]);

  // Memoize issue type options to prevent re-computation
  const issueTypeOptionsList = useMemo(
    () =>
      issueTypeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    []
  );

  // Memoize tag change handler
  const handleTagChange = useCallback(
    (field: { value: string[]; onChange: (value: string[]) => void }) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const newValue = checked
          ? [...field.value, value]
          : field.value.filter((val: string) => val !== value);
        field.onChange(newValue);
      },
    []
  );

  return (
    <div className="mx-auto max-w-[600px] rounded-lg bg-gray-50 p-5 shadow-md sm:p-4">
      <h1 className="mb-5 text-center text-4xl font-bold text-gray-800">
        Support Request Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Full Name"
          htmlFor="fullName"
          error={errors.fullName?.message}
        >
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField
          label="Email Address"
          htmlFor="email"
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField
          label="Issue Type"
          htmlFor="issueType"
          error={errors.issueType?.message}
        >
          <select
            id="issueType"
            {...register("issueType")}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.issueType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select an issue type</option>
            {issueTypeOptionsList}
          </select>
        </FormField>

        <div className="mb-3">
          <label className="mb-2 block font-semibold text-gray-700">Tags</label>
          <div className="flex flex-wrap gap-3">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <>
                  {tagOptions.map((tag) => (
                    <TagCheckbox
                      key={tag.value}
                      id={`tag-${tag.value}`}
                      value={tag.value}
                      label={tag.label}
                      checked={field.value.includes(tag.value)}
                      onChange={handleTagChange(field)}
                    />
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
              <StepInput
                key={field.id}
                placeholder={`Step ${index + 1}`}
                register={register(`stepsToReproduce.${index}.step`)}
                error={errors.stepsToReproduce?.[index]?.step?.message}
                showRemoveButton={index > 0}
                onRemove={createRemoveHandler(index)}
              />
            ))}
            <button
              type="button"
              className="mt-2 max-w-24 cursor-pointer rounded border-0 bg-green-500 px-3 py-2 font-semibold text-white"
              onClick={handleAddStep}
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
