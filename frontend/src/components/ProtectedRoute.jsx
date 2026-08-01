import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">

        <h1 className="text-2xl font-bold">
          Loading...
        </h1>

      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;