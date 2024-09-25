import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserAuth() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = async () => {
    if ( firstName === "" || lastName === "" || email === "" ||password === "" ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      alert("Sign up successful");
      navigate("/");
    } catch (error) {
      alert("Sign up failed");
    }
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        email: email,
        password: password,
      });
      console.log(res.data);
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userName", res.data.name);
      navigate("/userDashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <input
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        type="text"
        placeholder="first name"
        className="mb-4 p-2 rounded-md border-2 border-black"
      />
      <input
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        type="text"
        placeholder="last name"
        className="mb-4 p-2 rounded-md border-2 border-black"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="email"
        className="mb-4 p-2 rounded-md border-2 border-black"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="password"
        className="mb-4 p-2 rounded-md border-2 border-black"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Login
      </button>
      <button
        onClick={signUp}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Sign Up
      </button>
    </div>
  );
}
