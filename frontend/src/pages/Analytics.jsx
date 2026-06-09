import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Analytics() {

    const [stats, setStats] = useState({});

    const [performance, setPerformance] = useState([]);

    const fetchAnalytics = async () => {

        try {

            const response = await API.get("/analytics/stats");

            setStats(response.data.stats);

            setPerformance(response.data.performance);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const topPerformer =
        performance.length > 0
            ? [...performance].sort(
                (a, b) => parseFloat(b.conversionRate) - parseFloat(a.conversionRate)
            )[0]
            : null;

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-slate-100 min-h-screen">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-4xl font-bold mb-8">
                        Analytics
                    </h1>

                    <div className="grid grid-cols-5 gap-6">

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                            <h2 className="text-gray-500">
                                Total Leads
                            </h2>
                            <p className="text-4xl font-bold text-blue-600 mt-2">
                                {stats.totalLeads}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                            <h2 className="text-gray-500">
                                Active Leads
                            </h2>
                            <p className="text-4xl font-bold text-purple-600 mt-2">
                                {stats.activeLeads}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                            <h2 className="text-gray-500">
                                Converted
                            </h2>
                            <p className="text-4xl font-bold text-green-600 mt-2">
                                {stats.convertedLeads}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                            <h2 className="text-gray-500">
                                Lost
                            </h2>
                            <p className="text-4xl font-bold text-red-600 mt-2">
                                {stats.lostLeads}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                            <h2 className="text-gray-500">
                                Conversion Rate
                            </h2>
                            <p className="text-4xl font-bold text-orange-600 mt-2">
                                {stats.conversionRate}%
                            </p>
                        </div>

                    </div>

                    {
                        topPerformer && (

                            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6 mt-8 shadow-md">

                                <h2 className="text-2xl font-bold">
                                    🏆 Top Performer
                                </h2>

                                <p className="mt-2 text-lg">
                                    {topPerformer.name}
                                </p>

                                <p className="font-semibold text-green-700">
                                    {topPerformer.conversionRate}% Conversion Rate
                                </p>

                            </div>

                        )
                    }

                    <div className="bg-white mt-8 rounded-xl shadow-md overflow-hidden">

                        <div className="p-5 border-b">

                            <h2 className="text-2xl font-bold">
                                Sales Team Performance
                            </h2>

                        </div>

                        <table className="w-full">

                            <thead className="bg-slate-100">

                                <tr>

                                    <th className="p-4 text-left">
                                        Name
                                    </th>

                                    <th className="p-4 text-left">
                                        Total Leads
                                    </th>

                                    <th className="p-4 text-left">
                                        Converted
                                    </th>

                                    <th className="p-4 text-left">
                                        Active
                                    </th>

                                    <th className="p-4 text-left">
                                        Conversion %
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    performance.map((user) => (

                                        <tr
                                            key={user.id}
                                            className="border-b hover:bg-slate-50 transition"
                                        >

                                            <td className="p-4 font-medium">
                                                {user.name}
                                            </td>

                                            <td className="p-4">
                                                {user.totalLeads}
                                            </td>

                                            <td className="p-4 text-green-600 font-bold">
                                                {user.convertedLeads}
                                            </td>

                                            <td className="p-4 text-blue-600 font-bold">
                                                {user.activeLeads}
                                            </td>

                                            <td className="p-4 font-bold">
                                                {user.conversionRate}%
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

export default Analytics;