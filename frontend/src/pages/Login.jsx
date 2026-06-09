import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );
            localStorage.setItem(
                "token",
                response.data.token
            );
            navigate("/dashboard");
        }
        catch (error) {
            alert("Login Failed");
        }
    };
    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
                <h1 className="text-3xl font-bold text-center mb-2">
                    SmartCRM
                </h1>
                <p className="text-gray-500 text-center mb-6">
                    Login to continue
                </p>
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
                    className="w-full p-3 border rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Login
                </button>
                <p className="text-center text-sm mt-6 text-gray-600">
                    Don't have an account?
                    <span
                        className="text-blue-600 ml-2 cursor-pointer font-semibold"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}
export default Login;