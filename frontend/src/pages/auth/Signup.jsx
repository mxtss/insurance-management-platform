import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../services/authService";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: "",

    role: "Insurance Agent",

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

    setLoading(true);

    setError("");

    try {

      await register(form);

      alert("Account created successfully!");

      navigate("/");

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

        "Registration failed."

      );

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600">

          Create Account

        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">

          Insurance Management Platform

        </p>

        {error && (

          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">

            {error}

          </div>

        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            className="w-full border rounded p-3"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded p-3"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded p-3"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full border rounded p-3"
            value={form.role}
            onChange={handleChange}
          >

            <option>Insurance Agent</option>

            <option>Customer</option>

          </select>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded p-3 hover:bg-blue-700"
          >

            {loading ? "Creating..." : "Create Account"}

          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;