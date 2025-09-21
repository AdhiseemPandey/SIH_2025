import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VyawasthaHeading = () => (
  <div className="flex justify-center mb-8 md:mb-12">
    <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      Vyawastha
    </h1>
  </div>
);

const RegisterPage = () => {
  const navigate = useNavigate();
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
    if (e.key === "Backspace" && element.value === "" && element.previousSibling) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const validateForm = (fields) => {
    const newErrors = {};
    let isValid = true;
    fields.forEach((field) => {
      // (Your detailed validation logic for each field goes here)
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

  const handleSendOtp = () => {
    if (!validateForm(["mobileNumber"])) return;
    setShowOtpModal(true);
    alert(`Simulated: OTP sent to ${formData.mobileNumber}. Use "123456" for verification.`);
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      setIsMobileVerified(true);
      setShowOtpModal(false);
      alert("Mobile number verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming final validation passes and mobile is verified
    if (!isMobileVerified) {
        alert("Please verify your mobile number first.");
        return;
    }
    console.log("Registering user with the following data:", formData);
    alert("Registration successful! You will now be taken to the instructions page.");
    navigate('/instructions');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400" required placeholder="John" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400" required placeholder="Doe" />
            </div>
            <div>
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="emailId" name="emailId" value={formData.emailId} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-400" required placeholder="john.doe@vyawastha.com" />
            </div>
            <div className="flex justify-end mt-8">
              <button type="button" onClick={handleNext} className="w-24 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition">Next</button>
            </div>
          </div>
        );
      case 2:
        return (
            <div className="space-y-6">
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border-b-2" required min="15" max="120" placeholder="25" />
                </div>
                <div>
                    <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
                    <input type="text" id="aadharNumber" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border-b-2" required minLength="12" maxLength="12" placeholder="XXXX XXXX XXXX" />
                </div>
                <div className="flex justify-between mt-8">
                    <button type="button" onClick={() => setStep(1)} className="w-24 py-2 text-gray-600 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition">Back</button>
                    <button type="button" onClick={handleNext} className="w-24 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition">Next</button>
                </div>
            </div>
        );
      case 3:
        return (
            <div className="space-y-6">
                <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className={`flex-grow px-3 py-2 border-b-2 bg-transparent ${isMobileVerified ? "bg-gray-100 cursor-not-allowed" : ""}`} required disabled={isMobileVerified} placeholder="+919876543210" />
                        {!isMobileVerified ? (
                            <button type="button" onClick={handleSendOtp} className="bg-purple-600 text-white font-medium py-2 px-4 rounded-full hover:bg-purple-700 text-sm">Verify</button>
                        ) : (
                            <span className="text-green-600 flex items-center font-medium text-sm">Verified</span>
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border-b-2 bg-transparent" required minLength="8" placeholder="••••••••" />
                </div>
                <div className="flex justify-between mt-8">
                    <button type="button" onClick={() => setStep(2)} className="w-24 py-2 text-gray-600 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition">Back</button>
                    <button type="submit" disabled={!isMobileVerified} className={`w-24 py-2 rounded-full font-bold text-white transition ${isMobileVerified ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"}`}>Register</button>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="absolute w-96 h-96 bg-purple-200 rounded-full -top-16 -left-16 blur-3xl opacity-50"></div>
      <div className="absolute w-96 h-96 bg-pink-200 rounded-full -bottom-16 -right-16 blur-3xl opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-lg p-8 md:p-12 backdrop-blur-md bg-white bg-opacity-30 rounded-3xl border border-white/50 shadow-2xl">
        <VyawasthaHeading />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-8">Join us and be a part of the change.</p>
        <form onSubmit={handleSubmit}>{renderStep()}</form>
        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline font-semibold">Sign in here</a>
        </p>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="backdrop-blur-md bg-white bg-opacity-60 rounded-lg shadow-2xl p-6 w-full max-w-xs text-center border border-white/50">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Mobile</h3>
            <p className="text-gray-500 text-sm mb-6">Enter the 6-digit code sent to you.</p>
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
                  className="w-10 h-10 text-center text-lg border-b-2 bg-transparent focus:outline-none"
                />
              ))}
            </div>
            <button type="button" onClick={handleVerifyOtp} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full transition">Verify</button>
            <button type="button" onClick={handleSendOtp} className="w-full mt-4 text-purple-600 hover:underline font-semibold text-sm">Resend Code</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;