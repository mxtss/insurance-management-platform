import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message || "Invalid email or password."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Insurance Management
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to continue
        </p>

        {error && (
          <div className="mb-5 bg-red-100 text-red-600 rounded p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-5">

            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full border rounded-lg px-3 py-2"
            />

          </div>

          <div className="mb-6">

            <label className="font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-2 w-full border rounded-lg px-3 py-2"
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;