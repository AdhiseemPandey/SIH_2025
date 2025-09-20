import React, { useState } from "react";

function Instruct() {
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    if (isChecked) {
      setMessage(
        "Registration successful! You have read and agreed to all terms and conditions."
      );
    } else {
      setMessage("Please read and accept the terms and conditions to proceed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 flex flex-col">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-4">
          Instructions for Registration
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-lg mx-auto">
          Please read the following instructions carefully before proceeding
          with your registration. Your cooperation ensures a smooth and secure
          application process.
        </p>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8 border-t border-b py-6">
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              **Eligibility Criteria:** You must be a citizen of legal age (18
              years or older) to register. All applicants must provide a valid
              government-issued ID for verification.
            </li>
            <li>
              **Required Documents:** Prepare digital copies (PDF or JPG format)
              of the following documents: national ID card, proof of current
              address, and a recent passport-sized photograph.
            </li>
            <li>
              **Application Fee:** The entire application process is free of
              cost. Do not pay any fees to unauthorized individuals or
              platforms, as this may lead to fraudulent activities.
            </li>
            <li>
              **Form Submission:** Fill out all sections of the online form
              accurately and completely. Incomplete applications or those with
              false information will be automatically rejected.
            </li>
            <li>
              **Data Confidentiality:** All your personal data is confidential
              and will be securely stored. Your information will only be used
              for official government purposes as outlined in our privacy
              policy.
            </li>
            <li>
              **Email Verification:** You must use a valid and active email
              address for your registration. A confirmation link will be sent to
              this email to verify your account.
            </li>
            <li>
              **Password Security:** Create a strong, unique password that
              includes a mix of uppercase and lowercase letters, numbers, and
              special characters. Do not share your password with anyone.
            </li>
            <li>
              **Application Status:** You can check the status of your
              application at any time by logging into the portal with your
              registered credentials.
            </li>
            <li>
              **Technical Support:** For any technical assistance or if you
              encounter issues during registration, please contact our official
              support helpline.
            </li>
            <li>
              **Terms of Use:** By proceeding, you acknowledge that you have
              read and understood all the terms, conditions, and legal
              disclaimers associated with this service.
            </li>
          </ol>
        </div>

        <div className="flex items-center space-x-3 mb-8">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 transition duration-200 cursor-pointer"
          />
          <label
            htmlFor="termsCheckbox"
            className="text-gray-800 font-medium cursor-pointer select-none hover:text-blue-700 transition duration-200"
          >
            I have read and agree to all{" "}
            <span className="text-blue-600 hover:underline">
              Terms and Conditions
            </span>
            .
          </label>
        </div>

        <button
          onClick={handleRegister}
          disabled={!isChecked}
          className={`w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform ${
            isChecked
              ? "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:-translate-y-1"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Register
        </button>

        {message && (
          <div className="mt-6 p-4 rounded-lg text-center font-medium transition-opacity duration-500 opacity-100 bg-blue-100 border border-blue-200 shadow-sm text-blue-800">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Instruct;
