import api from "./api";


export const getPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};


export const createPayment = async (payment) => {
  const response = await api.post("/payments", payment);
  return response.data;
};


export const getPayment = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};


export const updatePayment = async (id, payment) => {
  const response = await api.put(`/payments/${id}`, payment);
  return response.data;
};


export const deletePayment = async (id) => {
  const response = await api.delete(`/payments/${id}`);
  return response.data;
};


export const getDuePayments = async () => {
  const response = await api.get("/payments/due");
  return response.data;
};


export const getOverduePayments = async () => {
  const response = await api.get("/payments/overdue");
  return response.data;
};