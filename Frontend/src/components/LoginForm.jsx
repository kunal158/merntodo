import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { authActions } from "./store";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://todoing-wheat.vercel.app/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      // Log the response received from the backend
      console.log("Response:", response);

      if (response.ok) {
        // Login successful, navigate to the home page
        const responseData = await response.json();
        sessionStorage.setItem("id", responseData.user._id);
        dispatch(authActions.login());
        navigate("/");
      } else {
        // Login failed, handle error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="txt_field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pass">Forgot Password?</div>
        <input type="submit" value="Login" />

        <div className="signup_link">
          Not a member? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
