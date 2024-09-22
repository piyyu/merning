import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const name = localStorage.getItem("userName");
        setName(name);
        if(!token){
            alert("Please login first");
            navigate("/")
        }
        setLoading(false);
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        navigate("/")
    }

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to Coursera, <span className="text-blue-600">{name}</span></h1>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">logout</button>
    </div>
  );
}