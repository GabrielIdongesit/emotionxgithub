import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      alert("No account found with this email");
      return;
    }

    // Update password
    users[userIndex].password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    alert("Password reset successful. Please sign in.");
    navigate("/signin");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Reset Password
      </h2>

      <form onSubmit={handleReset} className="space-y-4">

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full rounded"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="border p-2 w-full rounded pr-12"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-teal-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          className="border p-2 w-full rounded"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="bg-teal-600 hover:bg-teal-700 text-white w-full py-2 rounded font-semibold">
          Reset Password
        </button>

      </form>
    </div>
  );
};

export default ForgotPassword;
