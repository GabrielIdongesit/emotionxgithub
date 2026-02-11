import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;

  const handleVerify = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map(user =>
      user.email === email
        ? { ...user, verified: true }
        : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Email verified successfully!");
    navigate("/signin");
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>

      <p className="mb-4">
        A verification link has been sent to:
        <br />
        <strong>{email}</strong>
      </p>

      <button
        onClick={handleVerify}
        className="bg-teal-600 text-white px-6 py-2 rounded"
      >
        Verify Email
      </button>
    </div>
  );
};

export default VerifyEmail;
