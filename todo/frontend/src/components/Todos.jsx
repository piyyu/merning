import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
    const [todos, setTodos] = useState([]);

        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get("http://localhost:3000/todos", {headers: {token}});
                setTodos(res.data.todos);
            } catch (error) {
                alert("fetching todos failed");
            }
        }

        useEffect(() => {
            fetchTodos();
        }, []);


        const handleMarkAsDone = async (index) => {
            const todo = todos[index];
            const token = localStorage.getItem('token');

            try {
                await axios.put("http://localhost:3000/todo/done", {todoId: todo._id}, {headers: {token}});
                fetchTodos();
            } catch (error) {
                alert("marking todo as done failed");
            }
        }

        const handleDelete = async (index) => {
            const todo = todos[index];
            const token = localStorage.getItem('token');

            try {
                await axios.delete(`http://localhost:3000/todo/delete/${todo._id}`, {headers: {token}})
                fetchTodos();
            } catch (error) {
                alert("deleting todo failed");
            }
        }

    return (
        <div className="flex flex-wrap justify-center gap-4 px-4 py-4">
            {todos.map((todo, index) => (
                <div key={todo._id} className="flex flex-col w-full max-w-sm p-4 bg-white shadow-lg rounded-lg gap-4 dark:bg-gray-800 dark:shadow-gray-700">
                    <h1 className="text-xl font-bold text-center text-gray-800 dark:text-white">{todo.title}</h1>
                    <p className="text-center text-gray-600 dark:text-gray-400">{todo.description}</p>
                    <div className="mt-4 flex justify-center">
                        <button onClick={() => handleMarkAsDone(index)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mx-2">
                            {todo.done ? "completed" : "done"}
                        </button>
                        <button onClick={() => handleDelete(index)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mx-2">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
