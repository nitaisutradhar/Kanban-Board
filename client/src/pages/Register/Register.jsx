import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth  from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";


const Register = () => {
      const { createUser, setUser, updateUser } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    const { name, email, password } = formData;
    if (!validatePassword(formData.password)) return;

    // Firebase Authentication
    createUser(email, password).then(() => {
      updateUser({ displayName: name }).then(() => {
        setUser({ ...name, displayName: name });
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: `Welcome, ${formData.name}!`,
          confirmButtonColor: "#06B6D4",
        }).then(() => navigate("/login"));
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
    })
    .catch((error) => {
      showToast(error.message, "error")
    });
  };


  return (
    <div className="hero bg-base-200 min-h-[85vh]">
      <div className="w-[40%]">
        <div className="text-center lg:text-left">
          <div className="card bg-base-100 w-[100%] shrink-0 shadow-2xl">
            <div className="card-body w-[100%]">
                <h1 className="text-2xl font-bold text-center">Register Now</h1>
              <form onSubmit={handleSubmit} className="fieldset">
                {/* Name */}
                <label className="label">Name</label>
                <input name="name" type="text" className="input w-full" onChange={handleChange} placeholder="Enter your name" />
                {/* Email */}
                <label className="label">Email</label>
                <input name="email" type="email" className="input w-full" onChange={handleChange} placeholder="Email" />
                {/* Password */}
                <label className="label">Password</label>
                <div className="relative flex items-center">
                    <input
                  type={showPass ? 'text' : 'password'}
                  className="input w-full"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                />
                <span
                onClick={() => setShowPass(!showPass)}
                className="z-10 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
                </div>
                
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">Register</button>
              </form>
              <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-info hover:underline">
              Login here
            </Link>
          </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
