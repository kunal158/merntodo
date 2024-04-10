import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import Todo from "./components/Todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./components/store";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, []);

const handleRedirect = () => {
  window.open( "https://ktechspace.netlify.com" , "_blank" );
};

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<LoginForm />} />
      </Routes>
      <button className="made-by-btn" onClick={handleRedirect}>
        MADE BY KUNAL
      </button>
    </BrowserRouter>
  );
}
