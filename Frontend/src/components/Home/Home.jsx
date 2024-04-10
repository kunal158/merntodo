import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <div className="home flex justify-center items-center">
      <div className="container flex justify-center items-center flex-col">
        <h1 className="text-center">
          Organize your <br /> work and life, finally.
        </h1>
        <p>
          Become focused, organized, and calm with <br />
          todo app. The World's #1 task manager app.
        </p>
        
        {isLoggedIn ? (
          <a href="/todo" className="block py-2 px-4 bg-blue-500 text-white rounded-lg mt-4 text-center">Make Todo List</a>
        ) : (
          <a href="/signin" className="block py-2 px-4 bg-blue-500 text-white rounded-lg mt-4 text-center">Login to create a todo list</a>
        )}

      </div>
    </div>
  );
};

export default Home;
