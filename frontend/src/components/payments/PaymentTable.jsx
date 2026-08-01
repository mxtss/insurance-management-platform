function PaymentTable({
  payments,
  onEdit,
  onDelete,
}) {

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4">
              Policy No.
            </th>

            <th>
              Customer Name
            </th>

            <th>
              Payment Date
            </th>

            <th>
              Due Date
            </th>

            <th>
              Amount
            </th>

            <th>
              Status
            </th>

            <th>
              Actions
            </th>

          </tr>

        </thead>


        <tbody>

          {payments.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="text-center py-10 text-gray-500"
              >

                No payments found.

              </td>

            </tr>

          ) : (

            payments.map((payment) => (

              <tr
                key={payment.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {payment.policy_number}
                </td>


                <td>
                  {payment.customer_name}
                </td>


                <td>
                  {payment.payment_date}
                </td>


                <td>
                  {payment.due_date}
                </td>


                <td>
                  ₹{" "}
                  {Number(
                    payment.amount
                  ).toLocaleString("en-IN")}
                </td>


                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      
                      payment.payment_status === "Paid"
                        ? "bg-green-600"
                        : payment.payment_status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-600"

                    }`}
                  >

                    {payment.payment_status}

                  </span>

                </td>


                <td>

                  <div className="flex gap-2 justify-center">


                    <button
                      onClick={() => onEdit(payment)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >

                      Edit

                    </button>


                    <button
                      onClick={() => onDelete(payment.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >

                      Delete

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


export default PaymentTable;