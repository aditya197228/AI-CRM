import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
function Customers() {
    const [customers, setCustomers] = useState([]);
    const fetchCustomers = async () => {
        try {
            const response = await API.get(
                "/customers/all"
            );
            setCustomers(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCustomers();
    }, []);
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-slate-100 min-h-screen">
                <Navbar />
                <div className="p-8">
                    <h1 className="text-4xl font-bold mb-8">
                        Customers
                    </h1>
                    <div className="grid grid-cols-3 gap-6">
                        {
                            customers.map((customer) => (
                                <div
                                    key={customer.id}
                                    className="bg-white rounded-2xl shadow-md p-6"
                                >
                                    <h2 className="text-2xl font-bold">
                                        {customer.name}
                                    </h2>

                                    <p className="text-gray-500">
                                        {customer.company}
                                    </p>

                                    <p className="mt-3">
                                        📧 {customer.email}
                                    </p>

                                    <p>
                                        📱 {customer.phone}
                                    </p>

                                    <p>
                                        👤 {customer.assignedUser}
                                    </p>

                                    <div className="mt-4">

                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                            Customer
                                        </span>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Customers;