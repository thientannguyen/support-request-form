import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { issueTypeOptions, tagOptions } from "../models";
import type { RootState } from "../store";

const ConfirmationPage = () => {
  const currentSubmission = useSelector(
    (state: RootState) => state.form.currentSubmission
  );

  // Memoize the formatted tags string
  const formattedTags = useMemo(() => {
    if (!currentSubmission) return "";
    return currentSubmission.tags
      .map((tag) => {
        const tagOption = tagOptions.find((option) => option.value === tag);
        return tagOption ? tagOption.label : tag;
      })
      .join(", ");
  }, [currentSubmission]);

  // Memoize the issue type label
  const issueTypeLabel = useMemo(() => {
    if (!currentSubmission) return "";
    const issueTypeOption = issueTypeOptions.find(
      (option) => option.value === currentSubmission.issueType
    );
    return issueTypeOption
      ? issueTypeOption.label
      : currentSubmission.issueType;
  }, [currentSubmission]);

  if (!currentSubmission) {
    return (
      <div className="mx-auto max-w-[800px] p-4 sm:p-5">
        <h1 className="mb-5 text-center text-4xl font-bold text-gray-800">
          No submission found
        </h1>
        <div className="mb-4 text-xl font-semibold text-gray-600">
          Please submit a support request form first.
        </div>
        <Link
          to="/"
          className="mx-auto mt-5 inline-block rounded-md bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Go to Form
        </Link>
      </div>
    );
  }

  const { fullName, email, stepsToReproduce } = currentSubmission;

  return (
    <div className="mx-auto max-w-[800px] p-4 sm:p-5">
      <h1 className="mb-5 text-center text-4xl font-bold text-gray-800">
        Support Request Submitted
      </h1>
      <div className="mb-5 rounded-lg bg-gray-100 p-5 shadow-lg sm:p-5">
        <h2 className="mb-4 text-2xl font-semibold text-gray-600">
          Thank you for your submission!
        </h2>
        <div className="flex flex-col gap-5">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <p className="my-2">
              <strong>Full Name:</strong> {fullName}
            </p>
            <p className="my-2">
              <strong>Email:</strong> {email}
            </p>
            <p className="my-2">
              <strong>Issue Type:</strong> {issueTypeLabel}
            </p>
            <p className="my-2">
              <strong>Tags:</strong> {formattedTags}
            </p>
            <div className="my-2">
              <p className="mb-2">
                <strong>Steps to Reproduce:</strong>
              </p>
              <ol className="list-decimal pl-5">
                {stepsToReproduce.map((item, index) => (
                  <li className="mb-1" key={index}>
                    {item.step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="mx-auto mt-5 inline-block rounded-md bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        Submit Another Request
      </Link>
    </div>
  );
};

export default ConfirmationPage;
