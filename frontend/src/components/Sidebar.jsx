import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Customers",
      path: "/customers",
    },
    {
      name: "Policies",
      path: "/policies",
    },
    {
      name: "Premiums",
      path: "/payments",
    },
    {
      name: "Claims",
      path: "/claims",
    },
    {
      name: "Documents",
      path: "/documents",
    },
    {
      name: "Reports",
      path: "/reports",
    },
  ];

  return (

    <div className="w-64 bg-blue-700 text-white min-h-screen">

      <div className="text-2xl font-bold text-center py-6 border-b border-blue-500">

        Insurance

      </div>

      <div className="mt-5">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`block px-6 py-3 transition hover:bg-blue-600 ${
              location.pathname === item.path
                ? "bg-blue-900"
                : ""
            }`}
          >

            {item.name}

          </Link>

        ))}

      </div>

    </div>

  );

}

export default Sidebar;