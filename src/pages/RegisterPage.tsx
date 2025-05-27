import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useAuth } from "../context/AuthContext";
import { Shield } from "lucide-react";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Something went wrong!!");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="m-auto w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Crime Summary Dashboard
          </h1>
          <p className="text-gray-600">Sign Up</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <InputText
              id="name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <InputText
              id="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              toggleMask
              className="w-full"
              inputClassName="w-full"
              feedback={false}
              required
            />
            <p className="text-xs text-gray-500">
              Password must be at least 6 characters
            </p>
          </div>

          <div>
            <Button
              type="submit"
              label={loading ? "Signing up..." : "Sign Up"}
              icon="pi pi-sign-in"
              className="w-full btn-primary"
              disabled={loading}
            />
          </div>
        </form>
        <Link
          to="/login"
          className="w-full text-center block mt-4 text-[14px] text-blue-600 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
