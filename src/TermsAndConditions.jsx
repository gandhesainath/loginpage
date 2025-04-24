import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <div className="mb-6 max-h-96 overflow-y-auto border p-4 rounded bg-white shadow text-black">
        <p>
          Terms and conditions
        </p>
        <p>
          By using this application, you agree to the terms and conditions
          stated here.
        </p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back
      </button>
    </div>
  );
};

export default TermsAndConditions;
