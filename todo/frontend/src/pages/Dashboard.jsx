import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTodo from "../components/CreateTodo";
import Todos from "../components/Todos";
import axios from "axios";

export default function Dashboard() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setName(localStorage.getItem('name'));

        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const fetchTodos = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get("http://localhost:3000/todos", { headers: { token } });
            setTodos(res.data.todos);
        } catch (error) {
            alert("Fetching todos failed");
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate("/");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex justify-end p-4">
                <button
                    className="px-3 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md dark:bg-red-600 dark:hover:bg-red-700"
                    onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow p-6">
                <div className="flex flex-col w-full max-w-5xl p-6 bg-white shadow-lg rounded-lg gap-4 dark:bg-gray-800 dark:shadow-gray-700">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Dashboard</h1>
                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
                        Welcome <span className="text-purple-600 font-bold text-lg">{name}</span>! Here you can manage your tasks and view your progress.
                    </p>
                    <div className="flex flex-col md:flex-row justify-around w-full max-w-5xl p-6 rounded-lg gap-4">
                        <CreateTodo onAddTodo={fetchTodos} />
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-around w-full max-w-5xl p-6 rounded-lg gap-4">
                        <Todos todos={todos} onAddTodo={fetchTodos} />
                    </div>
                </div>
            </div>
        </div>
    );
}
