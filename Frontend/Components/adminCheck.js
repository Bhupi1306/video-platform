import { backendRequest } from "./backendRequest";

const adminCheck = async() => {
    const token = localStorage.getItem("token");

    const response = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/verify`, "POST", {token})


    return response.isAdmin
}

export default adminCheck