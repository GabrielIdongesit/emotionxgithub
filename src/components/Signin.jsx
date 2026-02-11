import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    if (!user.verified) {
      alert("Please verify your email before signing in.");
      return;
    }

    login(user);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-2 w-full pr-10"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-teal-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button className="bg-green-500 text-white w-full py-2 rounded">
          Sign In
        </button>

        <p className="text-center text-sm mt-3">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-teal-600 cursor-pointer font-semibold"
          >
            Forgot Password?
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signin;
