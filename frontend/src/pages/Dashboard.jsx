import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {

    const navigate = useNavigate();

    const [showRecent, setShowRecent] = useState(false);

    const [recentLeads, setRecentLeads] = useState([]);

    const [stats, setStats] = useState({
        totalLeads: 0,
        newLeads: 0,
        contactedLeads: 0,
        convertedLeads: 0
    });

    const fetchStats = async () => {

        try {

            const response = await API.get("/dashboard/stats");

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchRecentLeads = async () => {

        try {

            const response = await API.get("/dashboard/recent-leads");

            setRecentLeads(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchStats();

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-slate-100 min-h-screen">

                <Navbar />

                <div className="p-6">

                    <h1 className="text-4xl font-bold mb-6">
                        Dashboard
                    </h1>

                    <div className="grid grid-cols-4 gap-6">

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <h2 className="text-gray-500 text-lg">
                                Total Leads
                            </h2>
                            <p className="text-4xl font-bold text-blue-600 mt-2">
                                {stats.totalLeads}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <h2 className="text-gray-500 text-lg">
                                New Leads
                            </h2>
                            <p className="text-4xl font-bold text-yellow-500 mt-2">
                                {stats.newLeads}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <h2 className="text-gray-500 text-lg">
                                Contacted
                            </h2>
                            <p className="text-4xl font-bold text-purple-600 mt-2">
                                {stats.contactedLeads}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <h2 className="text-gray-500 text-lg">
                                Converted
                            </h2>
                            <p className="text-4xl font-bold text-green-600 mt-2">
                                {stats.convertedLeads}
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={() => {
                            setShowRecent(!showRecent);
                            if (!showRecent) {
                                fetchRecentLeads();
                            }
                        }}
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
                    >

                        {showRecent
                            ? "▲ Hide Recent Leads"
                            : "▼ Show Recent Leads"}

                    </button>

                    {
                        showRecent && (

                            <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">

                                <div className="p-5 border-b">
                                    <h2 className="text-xl font-bold">
                                        Recent Leads
                                    </h2>
                                </div>

                                <table className="w-full">

                                    <thead className="bg-gray-100">

                                        <tr>

                                            <th className="text-left p-4">
                                                Name
                                            </th>

                                            <th className="text-left p-4">
                                                Status
                                            </th>

                                            <th className="text-left p-4">
                                                Assigned To
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            recentLeads.map((lead, index) => (

                                                <tr
                                                    key={index}
                                                    className="border-b hover:bg-gray-50 transition"
                                                >

                                                    <td className="p-4">
                                                        {lead.name}
                                                    </td>

                                                    <td className="p-4">

                                                        <span
                                                            className={
                                                                lead.status === "New"
                                                                    ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full" :
                                                                    lead.status === "Contacted"
                                                                        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full" :
                                                                        lead.status === "Interested"
                                                                            ? "bg-purple-100 text-purple-700 px-3 py-1 rounded-full" :
                                                                            lead.status === "Qualified"
                                                                                ? "bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full" :
                                                                                lead.status === "Converted"
                                                                                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full" :
                                                                                    "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                                                            }
                                                        >

                                                            {lead.status}

                                                        </span>

                                                    </td>

                                                    <td className="p-4">
                                                        {lead.assignedUser}
                                                    </td>

                                                </tr>

                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>

                        )
                    }

                    <button
                        onClick={handleLogout}
                        className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-md transition"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
}
export default Dashboard;