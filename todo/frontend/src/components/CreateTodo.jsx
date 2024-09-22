import { useState } from "react";
import axios from "axios";

export default function CreateTodo({onAddTodo}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    if(title.length > 30 || description.length > 50) {
        alert("title and description should not exceed 30 and 50 characters respectively");
        setTitle("");
        setDescription("");
        return;
    }

    const createTodo = async () => {
        if(title && description) {
            try {
                const token = localStorage.getItem('token');
                await axios.post("http://localhost:3000/todo", {title, description}, {headers: {token}});
                setTitle("");
                setDescription("");
                onAddTodo();
            } catch (error) {
                alert("todo creation failed");
            }
        } else {
            alert("please fill all the fields");
        }
    }
    
  return (
    <div className="flex flex-col w-full max-w-lg p-6 gap-4">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Enter a task"
        className="px-3 py-3 rounded-lg border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="Enter description"
        className="px-3 py-3 rounded-lg border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
      />

        <button onClick={createTodo} className="px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
          Create Todo
        </button>
      </div>
  );
}