import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();//useNavigate hook to programmatically navigate after registration
    const [name, setName] = useState("");//usestate is a hook that allows us to have state variables in functional components meaning we can store and update values like name, email, password, and role as the user interacts with the form which gives us a way to manage form data and handle user input effectively meaning we can capture the user's input and use it to send a registration request to the backend API when the user clicks the register button
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Sales");
    const handleRegister = async () => {
        try {
            const response = await API.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                    role
                }
            );
            alert(response.data.message);
            navigate("/");
        }
        catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };
    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-96">

                <h1 className="text-3xl font-bold text-center mb-2">
                    SmartCRM
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Create your account
                </p>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-5"
                >
                    <option>Admin</option>
                    <option>Sales</option>
                    <option>Manager</option>
                </select>

                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Register
                </button>

                <p className="text-center text-sm mt-6 text-gray-600">

                    Already have an account?

                    <span
                        className="text-blue-600 ml-2 cursor-pointer font-semibold"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>

    );

}


export default Register;