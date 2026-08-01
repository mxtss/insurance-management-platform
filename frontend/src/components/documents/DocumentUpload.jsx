import { useEffect, useState } from "react";

import { getCustomers } from "../../services/customerService";
import { uploadDocument } from "../../services/documentService";


function DocumentUpload({ onUploaded }) {

  const [customers, setCustomers] = useState([]);

  const [customerId, setCustomerId] = useState("");

  const [file, setFile] = useState(null);


  useEffect(() => {

    loadCustomers();

  }, []);



  const loadCustomers = async () => {

    try {

      const data = await getCustomers();

      setCustomers(data);

    } catch (error) {

      console.log(error);

    }

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!customerId || !file) {

      alert("Select customer and file.");

      return;

    }


    try {

      const formData = new FormData();


      formData.append(
        "customer_id",
        customerId
      );


      formData.append(
        "file",
        file
      );


      await uploadDocument(formData);


      alert(
        "Document uploaded successfully."
      );


      setCustomerId("");

      setFile(null);


      document.getElementById(
        "fileInput"
      ).value = "";


      onUploaded();


    } catch (error) {

      console.log(error);

      alert(
        "Unable to upload document."
      );

    }

  };



  return (

    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <h2 className="text-xl font-bold mb-4">

        Upload Document

      </h2>


      <form
        onSubmit={handleSubmit}
        className="flex gap-4 items-center"
      >


        <select

          value={customerId}

          onChange={(e) =>
            setCustomerId(e.target.value)
          }

          className="border p-2 rounded"

          required

        >

          <option value="">

            Select Customer

          </option>


          {customers.map((customer) => (

            <option

              key={customer.id}

              value={customer.id}

            >

              {customer.name}

            </option>

          ))}


        </select>



        <input

          id="fileInput"

          type="file"

          accept=".pdf,.jpg,.jpeg,.png"

          onChange={(e) =>
            setFile(e.target.files[0])
          }

          className="border p-2 rounded"

        />



        <button

          type="submit"

          className="bg-blue-600 text-white px-5 py-2 rounded"

        >

          Upload

        </button>


      </form>


    </div>

  );

}


export default DocumentUpload;