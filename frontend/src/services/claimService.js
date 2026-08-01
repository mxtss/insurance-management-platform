import api from "./api";


export const getClaims = async () => {

    const response = await api.get("/claims");

    return response.data;

};



export const createClaim = async (claim) => {

    const response = await api.post(
        "/claims",
        claim
    );

    return response.data;

};



export const getClaim = async (id) => {

    const response = await api.get(
        `/claims/${id}`
    );

    return response.data;

};



export const approveClaim = async (id) => {

    const response = await api.put(
        `/claims/${id}/approve`
    );

    return response.data;

};



export const rejectClaim = async (id) => {

    const response = await api.put(
        `/claims/${id}/reject`
    );

    return response.data;

};



export const getClaimHistory = async () => {

    const response = await api.get(
        "/claims/history"
    );

    return response.data;

};