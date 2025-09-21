import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// NEW: Instructions are stored in an array for easy access
const instructions = [
  "Eligibility Criteria: You must be a citizen of legal age (18 years or older).",
  "Required Documents: Prepare digital copies of your national ID card, proof of address, etc.",
  "Data Confidentiality: All your personal data is confidential and will be securely stored.",
  "Form Submission: Ensure all sections of the online form are filled out accurately and completely.",
  "Terms of Use: By proceeding, you acknowledge that you have read and understood all terms."
];

function InstructionsPage() {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // NEW: Function to handle text-to-speech
  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    const textToSpeak = instructions.join('. ');
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // NEW: Function to handle skipping the page
  const handleSkip = () => {
    window.speechSynthesis.cancel(); // Stop any speech before navigating
    navigate('/posts');
  };

  // NEW: Cleanup effect to stop speech if the user navigates away
  useEffect(() => {
    // This function is called when the component is unmounted
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border flex flex-col">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-4">
          Instructions
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-lg mx-auto">
          Please review the following instructions before proceeding.
        </p>

        {/* NEW: Read Aloud Button */}
        <div className="flex justify-center mb-6">
            <button 
              onClick={handleSpeak}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 5.858a9 9 0 0112.728 0m-12.728 0a9 9 0 010 12.728" /></svg>
              {isSpeaking ? 'Stop Speaking' : 'Read Aloud'}
            </button>
        </div>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8 border-t border-b py-6">
          <ol className="list-decimal pl-5 space-y-4">
            {/* NEW: Instructions are rendered from the array */}
            {instructions.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ol>
        </div>

        {/* NEW: Skip button to proceed manually */}
        <button
          onClick={handleSkip}
          className="w-full py-3 rounded-lg text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
        >
          Skip & Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

export default InstructionsPage;