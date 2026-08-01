import useAuth from "../hooks/useAuth";

function Navbar() {

  const {
    user,
    logout,
  } = useAuth();

  return (

    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <div>

        <h1 className="text-2xl font-bold">

          Dashboard

        </h1>

      </div>

      <div className="flex items-center gap-5">

        <div className="text-right">

          <h2 className="font-semibold">

            {user?.name}

          </h2>

          <p className="text-sm text-gray-500">

            {user?.role}

          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >

          Logout

        </button>

      </div>

    </div>

  );

}

export default Navbar;