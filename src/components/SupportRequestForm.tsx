import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import supportFormSchema from "../utils/schema";
import type { SupportRequestFormData } from "../models";

const SupportRequestForm = () => {
  const {
    register,
    handleSubmit,
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
      <div className="text-center mb-5 text-gray-800 text-4xl font-bold">
        Support Request Form
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
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
