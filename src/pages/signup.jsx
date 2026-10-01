import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Scissors, Eye, EyeOff } from "lucide-react";
import { supabase } from "../supabase";
import {
  setUser,
  setName,
  setRole,
} from "../redux/redux/Slices/HomeDataSlice.js";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { role: "admin" } },
    });

    if (error) {
      console.log("Signup error:", error);
      setError(error.message);
      return;
    }

    if (!data.session) {
      setSuccessMessage(
        "Signup successful! Please check your email and confirm your account, then log in."
      );
      return;
    }

    const { error: insertError } = await supabase.from("admin").insert({
      id: data.user.id,
      name: data.user.email,
      email: data.user.email,
    });

    if (insertError) {
      console.log("Admin table insert error:", insertError);
    }

    dispatch(setUser(data.user));
    dispatch(setName(data.user.email));
    dispatch(setRole("admin"));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink to-purple flex items-center justify-center mb-3">
            <Scissors className="text-white" size={26} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-800">Stylux</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-pink to-purple mt-2"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink to-purple text-white font-medium hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}