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
      if(token) {
        navigate("/dashboard");
      }
    })

    const signup = async () => {
        if(name && email && password) {
          try {
            const res = await axios.post("http://localhost:3000/signup", {name, email, password});
            alert("signup successful, redirecting to login");
            navigate("/");
          } catch (error) {
            alert("signup failed");
          }
        } else {
          alert("please fill all the fields");
        }
  }

  const login = async () => {
    if(email && password) {
      try {
        const res = await axios.post("http://localhost:3000/signin", {email, password});
        localStorage.setItem('token', res.data.token);
        alert("login successful");
        navigate("/dashboard");
      } catch (error) {
        alert("login failed");
      }
    }
  }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col w-full max-w-lg p-4 bg-white shadow-lg rounded-lg gap-4 dark:bg-gray-800 dark:shadow-gray-700">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
            className="px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email"
            className="px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
          />
          <input
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
          />
          <button onClick={login} className="px-2 py-2 bg-blue-500 text-white rounded-md dark:bg-blue-600 dark:hover:bg-blue-700">
            login
          </button>
          <button onClick={signup} className="px-2 py-2 bg-blue-500 text-white rounded-md dark:bg-blue-600 dark:hover:bg-blue-700">
            signup
          </button>
        </div>
      </div>
    );
  }
  