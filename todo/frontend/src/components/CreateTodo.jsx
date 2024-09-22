import { useState } from "react";
import axios from "axios";

export default function CreateTodo({onAddTodo}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const createTodo = async () => {
        if(title && description) {
            try {
                const token = localStorage.getItem('token');
                await axios.post("http://localhost:3000/todo", {title, description}, {headers: {token}});
                alert("todo created successfully");
                setTitle("");
                setDescription("");
            } catch (error) {
                alert("todo creation failed");
            }
        } else {
            alert("please fill all the fields");
        }
    }
    
  return (
    <div className="flex flex-col w-full max-w-lg p-6 gap-4 ">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Enter a task"
        className="px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="Enter description"
        className="px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
      />

      <div className="mt-4 flex justify-center">
        <button onClick={createTodo} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mx-2">
          Create Todo
        </button>
      </div>
    </div>
  );
}
