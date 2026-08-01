function CustomerTable({
  customers,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4">Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Address</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {customers.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="text-center p-8 text-gray-500"
              >
                No customers found.
              </td>

            </tr>

          ) : (

            customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {customer.name}
                </td>

                <td>{customer.email}</td>

                <td>{customer.phone}</td>

                <td>{customer.address}</td>

                <td>

                  <button
                    onClick={() => onEdit(customer)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(customer.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default CustomerTable;