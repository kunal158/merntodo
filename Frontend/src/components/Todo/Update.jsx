import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Update = ({ display, update }) => {
  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title || "",
        body: update.body || "",
      });
    }
  }, [update]);


  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
  });


  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };


  const submit = async () => {
    await axios
      .put(`${window.location.origin}/api/task/updatetask/${update._id}`, Inputs)
      .then((response) => {
        toast.success(response.data.message);
      });

    display("none");
  };


  return (
    <div className="p-5 flex flex-col items-start space-y-4 update">
      <h3 className="text-xl font-bold">Update Your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-full p-3 border rounded"
        value={Inputs.title}
        name="title"
        onChange={change}
        placeholder="Enter title..."
      />

      <textarea
        className="todo-inputs w-full p-3 border rounded"
        value={Inputs.body}
        name="body"
        onChange={change}
        placeholder="Enter body..."
      />

      <div className="flex space-x-3 my-4">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={submit}
        >
          UPDATE
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 focus:outline-none focus:bg-red-500"
          onClick={() => {
            display("none");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
