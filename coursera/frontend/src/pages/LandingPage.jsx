import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleUserAuth = () => {
    navigate("/userAuth");
  };

  const handleAdminAuth = () => {
    navigate("/adminAuth");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to Coursera</h1>
      <button
        onClick={handleUserAuth}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        User
      </button>
      <button
        onClick={handleAdminAuth}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Admin
      </button>
    </div>
  );
}
