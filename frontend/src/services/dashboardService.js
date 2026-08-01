import api from "./api";

export const getDashboardStats = async () => {
  const stats = {
    customers: 0,
    activePolicies: 0,
    claims: 0,
    premiumCollection: 0,
  };

  try {
    const customerRes = await api.get("/customers");
    stats.customers = customerRes.data.length;
  } catch (error) {}

  try {
    const policyRes = await api.get("/policies");

    stats.activePolicies = policyRes.data.filter(
      (policy) => policy.status === "Active"
    ).length;
  } catch (error) {}

  try {
    const claimRes = await api.get("/claims");
    stats.claims = claimRes.data.length;
  } catch (error) {}

  try {
    const paymentRes = await api.get("/payments");

    paymentRes.data.forEach((payment) => {
      stats.premiumCollection += Number(payment.amount);
    });
  } catch (error) {}

  return stats;
};