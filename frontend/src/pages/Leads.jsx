import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Leads() {

    const [leads, setLeads] = useState([]);// State to hold the list of leads meaning the data fetched from the backend API. Initially, it's an empty array.
    const [showForm, setShowForm] = useState(false);//usestate is a hook meaning it a react feature which enable us to add state fuctionalilty this give us the ability to manage and update the state of our component in a functional way. In this case, showForm is a boolean state variable that determines whether the form for adding a new lead is visible or not. Initially, it's set to false, meaning the form is hidden when the component first renders. When the user clicks the "Add Lead" button, we toggle the value of showForm to true, which makes the form visible. Clicking the button again will toggle it back to false, hiding the form. This allows us to control the visibility of the form based on user interaction.
    const [editId, setEditId] = useState(null);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "New",
        assignedTo: 1
    });

    const fetchLeads = async () => {

        try {

            const response = await API.get("/leads/all");

            setLeads(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchUsers = async () => {

        try {

            const response = await API.get("/users/all");

            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    useEffect(() => {
        fetchLeads();
        fetchUsers();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async () => {
        try {
            if (editId) {
                await API.put(`/leads/update/${editId}`, formData);
            } else {
                await API.post(
                    "/leads/create",
                    formData
                );
            }
            fetchLeads();
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                status: "New",
                assignedTo: 1
            });
            setEditId(null);
            setShowForm(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await API.delete(`/leads/delete/${id}`);
            fetchLeads();
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = (lead) => {
        setShowForm(true);
        setEditId(lead.id);
        setFormData({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            status: lead.status,
            assignedTo: lead.assignedTo
        });
    };

    return (

        <div className="flex bg-slate-100">
            <Sidebar />
            <div className="flex-1 min-h-screen">
                <Navbar />
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">

                        <div>

                            <h1 className="text-4xl font-bold text-slate-800">
                                Leads
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Manage your sales leads
                            </p>

                        </div>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-xl hover:scale-105"
                        >

                            {showForm ? "Close Form" : "Add Lead"}

                        </button>

                    </div>

                    {

                        showForm && (

                            <div className="bg-white p-8 rounded-2xl shadow-lg mb-10 border border-gray-100">

                                <h2 className="text-2xl font-bold mb-6 text-slate-700">
                                    Add New Lead
                                </h2>

                                <div className="grid grid-cols-2 gap-5">

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Lead Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="p-4 border border-gray-200 rounded-xl"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="p-4 border border-gray-200 rounded-xl"
                                    />

                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="p-4 border border-gray-200 rounded-xl"
                                    />

                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company Name"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="p-4 border border-gray-200 rounded-xl"
                                    />

                                    <select
                                        name="assignedTo"
                                        value={formData.assignedTo}
                                        onChange={handleChange}
                                        className="p-4 border border-gray-200 rounded-xl"
                                    >
                                        <option value="">
                                            Assign User
                                        </option>

                                        {
                                            users.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name} ({user.role})
                                                </option>
                                            ))
                                        }

                                    </select>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="p-4 border border-gray-200 rounded-xl"
                                    >
                                        <option value="New">New</option>
                                        <option value="Contacted">Contacted</option>
                                        <option value="Interested">Interested</option>
                                        <option value="Qualified">Qualified</option>
                                        <option value="Converted">Converted</option>
                                        <option value="Lost">Lost</option>
                                    </select>

                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="mt-6 bg-green-600 hover:bg-green-700 transition duration-300 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-xl"
                                >

                                    Save Lead

                                </button>

                            </div>

                        )

                    }

                    <div className="grid grid-cols-3 gap-6">

                        {

                            leads.map((lead) => (

                                <div
                                    key={lead.id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1 p-6 border border-gray-100"
                                >

                                    <div className="flex justify-between items-start mb-4">

                                        <div>

                                            <h2 className="text-2xl font-bold text-slate-800">
                                                {lead.name}
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                {lead.company}
                                            </p>

                                        </div>

                                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            {lead.status}
                                        </div>

                                    </div>

                                    <div className="space-y-2">

                                        <p className="text-gray-600">
                                            📧 {lead.email}
                                        </p>

                                        <p className="text-gray-600">
                                            📱 {lead.phone}
                                        </p>

                                        <p className="text-gray-600">
                                            👤 Assigned: {lead.assignedUser}
                                        </p>

                                    </div>

                                    <div className="flex gap-3 mt-6">

                                        <button
                                            onClick={() => handleEdit(lead)}
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 transition text-white py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(lead.id)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg"
                                        >
                                            Delete
                                        </button>
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
export default Leads;