function PolicyTable({
  policies,
  onEdit,
  onCancel,
  onRenew,
}) {

  const isExpiring = (date) => {

    const today = new Date();

    const expiry = new Date(date);

    const diff =
      (expiry - today) /
      (1000 * 60 * 60 * 24);

    return diff <= 30 && diff >= 0;

  };

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4">Policy No.</th>
            <th>Customer Name</th>
            <th>Policy Type</th>
            <th>Premium</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {policies.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-10 text-gray-500"
              >

                No policies found.

              </td>

            </tr>

          ) : (

            policies.map((policy) => (

              <tr
                key={policy.id}
                className={`border-t hover:bg-gray-50 ${
                  isExpiring(policy.end_date)
                    ? "bg-yellow-50"
                    : ""
                }`}
              >

                <td className="p-4">
                  {policy.policy_number}
                </td>

                <td>
                  {policy.customer_name}
                </td>

                <td>
                  {policy.policy_type}
                </td>

                <td>
                  ₹{" "}
                  {Number(
                    policy.premium_amount
                  ).toLocaleString("en-IN")}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      policy.status === "Active"
                        ? "bg-green-600"
                        : policy.status === "Cancelled"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >

                    {policy.status}

                  </span>

                </td>

                <td>

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() => onEdit(policy)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onCancel(policy.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => onRenew(policy.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Renew
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default PolicyTable;