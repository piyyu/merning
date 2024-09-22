import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex justify-end p-4">
                <button 
                    className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md dark:bg-red-600 dark:hover:bg-red-700" 
                    onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow p-6">
                <div className="flex flex-col w-full max-w-lg p-6 bg-white shadow-lg rounded-lg gap-4 dark:bg-gray-800 dark:shadow-gray-700">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Dashboard</h1>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Welcome to your dashboard! Here you can manage your tasks and view your progress.
                    </p>
                    
                    {/* Action Buttons (Optional) */}
                    <div className="mt-4 flex justify-center">
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mx-2">
                            Manage Tasks
                        </button>
                        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md mx-2">
                            View Progress
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
