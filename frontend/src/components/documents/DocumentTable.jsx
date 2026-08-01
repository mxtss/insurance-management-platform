function DocumentTable({
  documents,
  onDownload,
}) {


  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">


      <table className="w-full">


        <thead className="bg-slate-100">


          <tr>

            <th className="p-4">
              File Name
            </th>

            <th>
              Customer ID
            </th>

            <th>
              Uploaded At
            </th>

            <th>
              Action
            </th>

          </tr>


        </thead>



        <tbody>


          {documents.length === 0 ? (


            <tr>

              <td

                colSpan="4"

                className="text-center py-10 text-gray-500"

              >

                No documents found.

              </td>


            </tr>


          ) : (


            documents.map((document) => (


              <tr

                key={document.id}

                className="border-t hover:bg-gray-50"

              >


                <td className="p-4">

                  {document.file_name}

                </td>



                <td>

                  {document.customer_id}

                </td>



                <td>

                  {document.uploaded_at}

                </td>



                <td>


                  <button

                    onClick={() =>
                      onDownload(document.id)
                    }

                    className="bg-green-600 text-white px-4 py-1 rounded"

                  >

                    Download

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


export default DocumentTable;