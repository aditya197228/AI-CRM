import { Link } from "react-router-dom";//importing link component which allows us to create navigation links in our application that can be used to navigate between different routes without causing a full page reload meaning we can create a seamless user experience when navigating through our CRM application by using the Link component to link to different pages like dashboard, leads, customers, tasks, and analytics which are the main sections of our CRM application allowing users to easily access different features and functionalities of the CRM system.
import { jwtDecode } from "jwt-decode";

function Sidebar() {

    const token = localStorage.getItem("token");

    const user = jwtDecode(token);

    const role = user.role;

    const menuItems = {

        Admin: [

            { name: "Dashboard", path: "/dashboard" },
            { name: "Users", path: "/users" },
            { name: "Leads", path: "/leads" },
            { name: "Customers", path: "/customers" },
            { name: "Analytics", path: "/analytics" }

        ],

        Manager: [

            { name: "Dashboard", path: "/dashboard" },
            { name: "Reports", path: "/reports" },
            { name: "Tasks", path: "/tasks" }

        ],

        Sales: [

            { name: "Dashboard", path: "/dashboard" },
            { name: "My Leads", path: "/leads" },
            { name: "Tasks", path: "/tasks" }

        ],

        Support: [

            { name: "Dashboard", path: "/dashboard" },
            { name: "Tickets", path: "/tickets" }

        ]

    };

    return (

        <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

            <h2 className="text-xl font-bold mb-8">

                {role} Panel

            </h2>

            <div className="flex flex-col gap-4">

                {

                    menuItems[role].map(

                        (item, index) => (

                            <Link
                                key={index}
                                to={item.path}
                                className="hover:bg-slate-700 p-3 rounded-lg"
                            >

                                {item.name}

                            </Link>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default Sidebar;