import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const getPasswordStrength = (password) => {
  if (password.length < 6) return "Weak";
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return "Strong";
  return "Medium";
};

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const strength = getPasswordStrength(form.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === form.email)) {
      alert("Account already exists. Please sign in.");
      return navigate("/signin");
    }

    users.push({ name: form.name, email: form.email, password: form.password, verified: false });
    localStorage.setItem("users", JSON.stringify(users));

    alert(`Verification email sent to ${form.email} (simulation).\nClick OK to verify.`);

    const updatedUsers = users.map((u) =>
      u.email === form.email ? { ...u, verified: true } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    navigate("/signin");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Full Name"
          className="border p-2 w-full rounded"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border p-2 w-full rounded"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-2 w-full rounded pr-12"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-teal-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <p
          className={`text-sm font-semibold ${
            strength === "Weak" ? "text-red-500" : strength === "Medium" ? "text-yellow-500" : "text-green-600"
          }`}
        >
          Password Strength: {strength}
        </p>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="border p-2 w-full rounded"
          required
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded font-semibold">
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")} className="text-teal-600 cursor-pointer font-semibold">
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
