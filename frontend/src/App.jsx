import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./hooks/useAuth";
import Customers from "./pages/customers/Customers";
import Policies from "./pages/policies/Policies";
import Payments from "./pages/payments/Payments";
import Claims from "./pages/claims/Claims";
import Documents from "./pages/documents/Documents";
import Reports from "./pages/reports/Reports";

function Placeholder({ title }) {
  return (
    <div className="p-10 text-3xl font-bold">
      {title}
    </div>
  );
}

function App() {

  const { user } = useAuth();

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            user
              ? <Navigate to="/dashboard" />
              : <Login />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/customers"
  element={
    <ProtectedRoute>
      <Customers />
    </ProtectedRoute>
  }
/>
        <Route
    path="/policies"
    element={
        <ProtectedRoute>
            <Policies />
        </ProtectedRoute>
    }
/>
        <Route
  path="/payments"
  element={
    <ProtectedRoute>
      <Payments />
    </ProtectedRoute>
  }
/>
        <Route
  path="/claims"
  element={
    <ProtectedRoute>
      <Claims />
    </ProtectedRoute>
  }
/>
        <Route
  path="/documents"
  element={
    <ProtectedRoute>
      <Documents />
    </ProtectedRoute>
  }
/>
        <Route
 path="/reports"
 element={
  <ProtectedRoute>
    <Reports/>
  </ProtectedRoute>
 }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;