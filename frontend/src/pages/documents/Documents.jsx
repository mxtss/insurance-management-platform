import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import DocumentUpload from "../../components/documents/DocumentUpload";
import DocumentTable from "../../components/documents/DocumentTable";

import {
  getDocuments,
  downloadDocument,
} from "../../services/documentService";


function Documents() {


  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadDocuments();

  }, []);




  const loadDocuments = async () => {

    try {

      setLoading(true);


      const data = await getDocuments();


      setDocuments(data);


    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };




  const handleDownload = async (id) => {

  try {

    const document = documents.find(
      doc => doc.id === id
    );


    await downloadDocument(
      id,
      document.file_name
    );


  } catch (error) {

    console.log(error);

    alert("Unable to download document.");

  }

};



  if (loading) {

    return (

      <MainLayout>

        <div className="text-center text-xl py-20">

          Loading Documents...

        </div>

      </MainLayout>

    );

  }




  return (

    <MainLayout>


      <h1 className="text-3xl font-bold mb-6">

        Document Management

      </h1>



      <DocumentUpload

        onUploaded={loadDocuments}

      />



      <DocumentTable

        documents={documents}

        onDownload={handleDownload}

      />


    </MainLayout>

  );

}


export default Documents;