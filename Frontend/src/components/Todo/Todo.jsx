import React, { useEffect, useState } from "react";
import "./Todo.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoCards from "./TodoCards";
import axios from "axios";
import Update from "./Update";

let toUpdateArray = [];

const Todo = () => {
  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const [Array, setArray] = useState([]);

  const [id, setId] = useState(sessionStorage.getItem("id")); // Initialize id state with session storage value

  useEffect(() => {
    setId(sessionStorage.getItem("id")); // Update id state with session storage value on component mount/update
  }, []);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title Or Body Can't Be Empty");
    } else {
      if (id) {
        await axios
          .post('https://todoing-ten.vercel.app/api/task/addtask', {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
      } else {
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
        toast.error("Your Task Is Not Saved ! Please SignUp");
      }
    }
  };

  const del = async (Cardid) => {
    if (id) {
      await axios
        .delete(`https://todoing-ten.vercel.app/api/task/deletetask/${Cardid}`, {
          data: { id: id },
        })
        .then(() => {
          toast.success("Your Task Is Deleted");
        });
    } else {
      toast.error("Please SignUp First");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (value) => {
    toUpdateArray = Array[value];
  };

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          const response = await axios.get(`https://todoing-ten.vercel.app/api/task/gettask/${id}`);
          setArray(response.data.list);
        } catch (error) {
          console.error("Error fetching todo list:", error);
        }
      };
      fetch();
    }
  }, [submit]); // Update the todo list whenever `id` changes

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container flex justify-center items-center my-4 flex-col">
          <div className="flex flex-col w-full sm:w-1/2 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-full sm:w-1/2 flex justify-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="todo-body">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
            {Array.map((item, index) => (
              <div className="mx-8 my-2" key={index}>
                <TodoCards
                  title={item.title}
                  body={item.body}
                  id={item._id}
                  delid={del}
                  display={dis}
                  updateId={index}
                  toBeUpdate={update}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="todo-update " id="todo-update">
        <div className="container update">
          <Update display={dis} update={toUpdateArray} />
        </div>
      </div>
    </>
  );
};

export default Todo;
