function ClaimTable({
  claims,
  onApprove,
  onReject,
}) {


  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">


      <table className="w-full">


        <thead className="bg-slate-100">

          <tr>

            <th className="p-4">Policy No.</th>
            <th>Customer</th>
            <th>Claim Amount</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Submission Date</th>
            <th>Actions</th>

          </tr>

        </thead>



        <tbody>


          {claims.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="text-center py-10 text-gray-500"
              >

                No claims found.

              </td>

            </tr>


          ) : (


            claims.map((claim) => (


              <tr
                key={claim.id}
                className="border-t hover:bg-gray-50"
              >


                <td className="p-4">
  {claim.policy_number}
</td>

<td>
  {claim.customer_name}
</td>



                <td>

                  ₹{" "}
                  {Number(
                    claim.claim_amount
                  ).toLocaleString("en-IN")}

                </td>




                <td>

                  {claim.reason}

                </td>




                <td>


                  <span

                    className={`px-3 py-1 rounded-full text-white ${
                      
                      claim.status === "Approved"

                      ? "bg-green-600"

                      : claim.status === "Rejected"

                      ? "bg-red-600"

                      : "bg-yellow-500"

                    }`}

                  >

                    {claim.status}

                  </span>


                </td>





                <td>

                  {claim.submission_date}

                </td>





                <td>


                  <div className="flex gap-2 justify-center">


                    {claim.status === "Pending" && (

                      <>


                        <button

                          onClick={() =>
                            onApprove(claim.id)
                          }

                          className="bg-green-600 text-white px-3 py-1 rounded"

                        >

                          Approve

                        </button>



                        <button

                          onClick={() =>
                            onReject(claim.id)
                          }

                          className="bg-red-600 text-white px-3 py-1 rounded"

                        >

                          Reject

                        </button>


                      </>

                    )}



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


export default ClaimTable;