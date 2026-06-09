import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Users() {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        try {

            const response = await API.get("/users/all");

            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchUsers();

    }, []);

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-slate-100 min-h-screen">

                <Navbar />

                <div className="p-8">

                    <div className="flex justify-between items-center mb-8">

                        <div>

                            <h1 className="text-4xl font-bold text-slate-800">
                                Users
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Manage system users
                            </p>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                        <table className="w-full">

                            <thead className="bg-slate-100">

                                <tr>

                                    <th className="text-left p-5 font-semibold">
                                        Name
                                    </th>

                                    <th className="text-left p-5 font-semibold">
                                        Email
                                    </th>

                                    <th className="text-left p-5 font-semibold">
                                        Role
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    users.map((user) => (

                                        <tr
                                            key={user.id}
                                            className="border-b hover:bg-slate-50 transition"
                                        >

                                            <td className="p-5 font-medium">
                                                {user.name}
                                            </td>

                                            <td className="p-5 text-gray-600">
                                                {user.email}
                                            </td>

                                            <td className="p-5">

                                                <span
                                                    className={
                                                        user.role === "Admin"
                                                            ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold" :
                                                            user.role === "Manager"
                                                                ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold" :
                                                                "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                                                    }
                                                >

                                                    {user.role}

                                                </span>

                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Users;