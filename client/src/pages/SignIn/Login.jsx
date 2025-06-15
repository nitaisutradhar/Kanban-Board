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

  // Firebase Login
  const { signIn } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to ConfirmRelief!",
          confirmButtonColor: "#06B6D4",
        }).then(() => navigate(`${location.state ? location.state : "/"}`));
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `Invalid email or password - ${errorMessage}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-[85vh]">
      <div className="w-[40%]">
        <div className="text-center lg:text-left">
          <div className="card bg-base-100 w-[100%] shrink-0 shadow-2xl">
            <div className="card-body w-[100%]">
                <h1 className="text-2xl font-bold text-center">Login Here</h1>
              <form onSubmit={handleLogin} className="fieldset">
                <label className="label">Email</label>
                <input
                 name="email"
                 onChange={(e) => setEmail(e.target.value)}
                 type="email" className="input w-full" placeholder="Email" />
                <label className="label">Password</label>
                <div className="relative flex items-center">
                    <input
                  type={showPass ? 'text' : 'password'}
                  className="input w-full"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
                <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
                </div>
                <div>
                  <Link className="link link-hover">Forgot password?</Link>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">Login</button>
              </form>
              {/* Register Link */}
          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-info hover:underline">
              Register here
            </Link>
          </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
