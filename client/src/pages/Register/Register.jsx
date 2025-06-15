import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { createUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 6;

    if (!hasUpper) {
      showToast("Password must include an uppercase letter", "warning");
      return false;
    }
    if (!hasLower) {
      showToast("Password must include a lowercase letter", "warning");
      return false;
    }
    if (!isLong) {
      showToast("Password must be at least 6 characters", "warning");
      return false;
    }
    return true;
  };

  const showToast = (msg, icon = "error") => {
    Swal.fire({
      toast: true,
      icon,
      title: msg,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#F1F5F9",
      color: "#1E293B",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!validatePassword(password)) return;

    createUser(email, password)
      .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: `Welcome!`,
              confirmButtonColor: "#06B6D4",
            }).then(() => navigate("/"));
          })
      .catch((error) => showToast(error.message, "error"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center text-primary">Register</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label className="label text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="label text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Create password"
                    className="input input-bordered w-full pr-10"
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button type="submit" className="btn btn-primary w-full mt-2">
                Register
              </button>
            </form>

            {/* Already have account */}
            <p className="text-sm mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
