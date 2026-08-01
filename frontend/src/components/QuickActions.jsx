import { Link } from "react-router-dom";

function QuickActions() {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">

                Quick Actions

            </h2>

            <div className="grid grid-cols-2 gap-4">

                <Link
                    to="/customers"
                    className="bg-blue-600 text-white text-center py-3 rounded-lg"
                >
                    Add Customer
                </Link>

                <Link
                    to="/policies"
                    className="bg-green-600 text-white text-center py-3 rounded-lg"
                >
                    Add Policy
                </Link>

                <Link
                    to="/claims"
                    className="bg-orange-500 text-white text-center py-3 rounded-lg"
                >
                    Claims
                </Link>

                <Link
                    to="/reports"
                    className="bg-purple-600 text-white text-center py-3 rounded-lg"
                >
                    Reports
                </Link>

            </div>

        </div>

    );

}

export default QuickActions;