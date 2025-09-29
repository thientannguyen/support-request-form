import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { issueTypeOptions, tagOptions } from "../models";
import type { RootState } from "../store";

const ConfirmationPage = () => {
  const currentSubmission = useSelector(
    (state: RootState) => state.form.currentSubmission
  );

  if (!currentSubmission) {
    return (
      <div className="max-w-[800px] mx-auto p-4 sm:p-5">
        <h1 className="text-gray-800 text-center mb-5 font-bold text-4xl">
          No submission found
        </h1>
        <div className="text-gray-600 text-xl font-semibold mb-4">
          Please submit a support request form first.
        </div>
        <Link
          to="/"
          className="inline-block mx-auto mt-5 px-5 py-2 bg-blue-600 text-white rounded-md font-semibold transition hover:bg-blue-700"
        >
          Go to Form
        </Link>
      </div>
    );
  }

  const { fullName, email, issueType, tags, stepsToReproduce } =
    currentSubmission;

  const getIssueTypeLabel = (value: string) => {
    const issueType = issueTypeOptions.find((option) => option.value === value);
    return issueType ? issueType.label : value;
  };

  const getTagLabel = (value: string) => {
    const tag = tagOptions.find((option) => option.value === value);
    return tag ? tag.label : value;
  };

  return (
    <div className="max-w-[800px] mx-auto p-4 sm:p-5">
      <h1 className="text-center mb-5 text-gray-800 text-4xl font-bold">
        Support Request Submitted
      </h1>
      <div className="bg-gray-100 rounded-lg shadow-lg p-5 mb-5 sm:p-5">
        <h2 className="text-gray-600 text-2xl font-semibold mb-4">
          Thank you for your submission!
        </h2>
        <div className="flex flex-col gap-5">
          <div className="p-4 bg-white rounded-md shadow-sm">
            <p className="my-2">
              <strong>Full Name:</strong> {fullName}
            </p>
            <p className="my-2">
              <strong>Email:</strong> {email}
            </p>
            <p className="my-2">
              <strong>Issue Type:</strong> {getIssueTypeLabel(issueType)}
            </p>
            <p className="my-2">
              <strong>Tags:</strong>{" "}
              {tags.map((tag) => getTagLabel(tag)).join(", ")}
            </p>
            <p className="my-2">
              <strong>Steps to Reproduce:</strong>{" "}
              <ol className="pl-5 list-decimal">
                {stepsToReproduce.map((item, index) => (
                  <li className="mb-1" key={index}>
                    {item.step}
                  </li>
                ))}
              </ol>
            </p>
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="inline-block mx-auto mt-5 px-5 py-2 bg-blue-600 text-white rounded-md font-semibold transition hover:bg-blue-700"
      >
        Submit Another Request
      </Link>
    </div>
  );
};

export default ConfirmationPage;
