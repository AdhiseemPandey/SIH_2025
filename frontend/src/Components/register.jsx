import React, { useState, useRef } from "react";

const VyawasthaHeading = () => (
  <div className="flex justify-center mb-8 md:mb-12">
    <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      Vyawastha
    </h1>
  </div>
);

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    age: "",
    aadharNumber: "",
    mobileNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (element, index, e) => {
    if (e.key === "Backspace" && element.value === "") {
      if (element.previousSibling) {
        otpInputRefs.current[index - 1].focus();
      }
    }
  };

  const validateForm = (fields) => {
    const newErrors = {};
    let isValid = true;

    fields.forEach((field) => {
      switch (field) {
        case "firstName":
          if (!formData.firstName || formData.firstName.length < 2) {
            newErrors.firstName = "First name is required.";
            isValid = false;
          }
          break;
        case "lastName":
          if (!formData.lastName || formData.lastName.length < 2) {
            newErrors.lastName = "Last name is required.";
            isValid = false;
          }
          break;
        case "emailId":
          if (
            !formData.emailId ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)
          ) {
            newErrors.emailId = "Please enter a valid email address.";
            isValid = false;
          }
          break;
        case "age":
          if (
            !formData.age ||
            !Number.isInteger(Number(formData.age)) ||
            Number(formData.age) < 15 ||
            Number(formData.age) > 120
          ) {
            newErrors.age = "Age must be a whole number between 15 and 120.";
            isValid = false;
          }
          break;
        case "aadharNumber":
          if (
            !formData.aadharNumber ||
            !/^\d{12}$/.test(formData.aadharNumber)
          ) {
            newErrors.aadharNumber = "Aadhaar must be 12 digits.";
            isValid = false;
          }
          break;
        case "mobileNumber":
          if (
            !formData.mobileNumber ||
            !/^(\+91)?\d{10}$/.test(formData.mobileNumber)
          ) {
            newErrors.mobileNumber = "Please enter a valid mobile number.";
            isValid = false;
          }
          break;
        case "password":
          if (!formData.password || formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
            isValid = false;
          }
          break;
        default:
          break;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (step === 1 && validateForm(["firstName", "lastName", "emailId"])) {
      setStep(2);
    } else if (step === 2 && validateForm(["age", "aadharNumber"])) {
      setStep(3);
    }
  };

  const handleSendOtp = async () => {
    if (!validateForm(["mobileNumber"])) {
      return;
    }
    setShowOtpModal(true);
    console.log(`Sending OTP to ${formData.mobileNumber}...`);
    alert(
      `Simulated: OTP sent to ${formData.mobileNumber}. Use "123456" for verification.`
    );
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }
    if (enteredOtp === "123456") {
      setIsMobileVerified(true);
      setShowOtpModal(false);
      alert("Mobile number verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMobileVerified) {
      alert("Please verify your mobile number before submitting.");
      return;
    }
    if (
      !validateForm([
        "firstName",
        "lastName",
        "emailId",
        "age",
        "aadharNumber",
        "mobileNumber",
        "password",
      ])
    ) {
      return;
    }
    console.log("Registering user with the following data:", formData);
    alert("Registration successful! (Simulated)");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400 transition duration-300"
                required
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400 transition duration-300"
                required
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="emailId"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400 transition duration-300"
                required
                placeholder="john.doe@vyawastha.com"
              />
              {errors.emailId && (
                <p className="text-red-500 text-xs mt-1">{errors.emailId}</p>
              )}
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleNext}
                className="w-24 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400 transition duration-300"
                required
                min="15"
                max="120"
                placeholder="25"
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="aadharNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Aadhaar Number
              </label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400 transition duration-300"
                required
                minLength="12"
                maxLength="12"
                pattern="\d{12}"
                placeholder="XXXX XXXX XXXX"
              />
              {errors.aadharNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.aadharNumber}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-24 py-2 text-gray-600 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-24 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={`flex-grow px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400 transition duration-300 ${
                    isMobileVerified ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  required
                  pattern="^(\+91)?\d{10}$"
                  disabled={isMobileVerified}
                  placeholder="e.g., +919876543210"
                />
                {!isMobileVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-purple-600 text-white font-medium py-2 px-4 rounded-full hover:bg-purple-700 transition-colors duration-300 flex-shrink-0 text-sm"
                  >
                    Verify
                  </button>
                )}
                {isMobileVerified && (
                  <span className="text-green-600 flex items-center font-medium text-sm">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Verified
                  </span>
                )}
              </div>
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400 transition duration-300"
                required
                minLength="8"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-24 py-2 text-gray-600 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!isMobileVerified}
                className={`w-24 py-2 rounded-full font-bold text-white transition-all duration-300 ${
                  isMobileVerified
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Register
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Gradients & Shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
      <div className="absolute w-96 h-96 bg-purple-200 rounded-full -top-16 -left-16 blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-200 rounded-full -bottom-16 -right-16 blur-3xl opacity-50 animate-pulse"></div>

      {/* Main Content Card (Glassmorphism Effect) */}
      <div className="relative z-10 w-full max-w-lg p-8 md:p-12 backdrop-blur-md bg-white bg-opacity-30 rounded-3xl border border-white/50 shadow-2xl transition-all duration-500 transform hover:scale-[1.01] hover:shadow-3xl">
        <VyawasthaHeading />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Join us and manage your business, your way.
        </p>
        <form onSubmit={handleSubmit}>{renderStep()}</form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 hover:underline font-semibold"
          >
            Sign in here
          </a>
        </p>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="backdrop-blur-md bg-white bg-opacity-60 rounded-lg shadow-2xl p-6 w-full max-w-xs relative text-center border border-white/50">
            <VyawasthaHeading />
            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
              Verify Mobile
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Enter the 6-digit code sent to your number.
            </p>
            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e.target, index, e)}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  className="w-10 h-10 text-center text-lg border-b-2 border-gray-300 bg-transparent focus:border-purple-500 focus:outline-none transition duration-300"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full transition-colors duration-300"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={() => {
                handleSendOtp();
                setOtp(["", "", "", "", "", ""]);
              }}
              className="w-full mt-4 text-purple-600 hover:underline font-semibold text-sm"
            >
              Resend Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
