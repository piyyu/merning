import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const signup = async () => {
        if (name && email && password) {
            try {
                const res = await axios.post("http://localhost:3000/signup", { name, email, password });
                alert("Signup successful, redirecting to login");
                navigate("/");
                
                
            } catch (error) {
                alert("Signup failed");
            }
        } else {
            alert("Please fill all the fields");
        }
    };

    const login = async () => {
        if (email && password) {
            try {
                const res = await axios.post("http://localhost:3000/signin", { email, password });
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.name);
                navigate("/dashboard");
            } catch (error) {
                alert("Login failed");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="flex flex-col w-full max-w-lg p-10 bg-white shadow-lg rounded-lg gap-4 dark:bg-gray-800 dark:shadow-gray-700">
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="px-3 py-3 rounded-lg border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
                />
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="px-3 py-3 rounded-lg border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="px-3 py-3 rounded-lg border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
                />
                <button onClick={login} className="px-3 py-3 bg-blue-500 text-white rounded-md dark:bg-blue-600 dark:hover:bg-blue-700">
                    Login
                </button>
                <div className="flex justify-center border-b-2 border-gray-300 dark:border-gray-600"></div>
                <button onClick={signup} className="px-3 py-3 bg-green-500 text-white rounded-md dark:bg-green-700 dark:hover:bg-green-800">
                    Signup
                </button>
            </div>
        </div>
    );
}
