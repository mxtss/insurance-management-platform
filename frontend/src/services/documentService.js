import api from "./api";


export const getDocuments = async () => {

    const response = await api.get("/documents");

    return response.data;

};



export const uploadDocument = async (formData) => {

    const response = await api.post(
        "/documents/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};



export const downloadDocument = async (
  id,
  filename
) => {

  const response = await api.get(
    `/documents/download/${id}`,
    {
      responseType: "blob"
    }
  );


  const url = window.URL.createObjectURL(
    response.data
  );


  const link = document.createElement("a");

  link.href = url;


  link.setAttribute(
    "download",
    filename
  );


  document.body.appendChild(link);

  link.click();


  link.remove();

};