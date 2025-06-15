import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { signIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to KanbanBoard!",
          confirmButtonColor: "#06B6D4",
        }).then(() => navigate(`${location.state ? location.state : "/"}`));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `Invalid email or password - ${error.message}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-blue-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center text-primary">Login</h2>
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="label text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pr-10"
                    required
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute z-10 top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <Link className="text-sm link link-hover text-info">Forgot password?</Link>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </form>
            <p className="text-sm mt-4 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
