import api from "./api";


export const getActivePolicies = async () => {

  const response = await api.get(
    "/reports/active-policies"
  );

  return response.data;

};



export const getExpiredPolicies = async () => {

  const response = await api.get(
    "/reports/expired-policies"
  );

  return response.data;

};



export const getClaimStatistics = async () => {

  const response = await api.get(
    "/reports/claim-statistics"
  );

  return response.data;

};



export const getPremiumCollection = async () => {

  const response = await api.get(
    "/reports/premium-collection"
  );

  return response.data;

};



export const getCustomerGrowth = async () => {

  const response = await api.get(
    "/reports/customer-growth"
  );

  return response.data;

};



export const getMonthlyReport = async () => {

  const response = await api.get(
    "/reports/monthly-report"
  );

  return response.data;

};

export const downloadMonthlyReport = async () => {

  const response = await api.get(
    "/pdf-reports/monthly",
    {
      responseType: "blob",
    }
  );

  return response.data;

};



export const downloadPolicyReport = async () => {

  const response = await api.get(
    "/pdf-reports/policies",
    {
      responseType: "blob",
    }
  );

  return response.data;

};



export const downloadClaimReport = async () => {

  const response = await api.get(
    "/pdf-reports/claims",
    {
      responseType: "blob",
    }
  );

  return response.data;

};