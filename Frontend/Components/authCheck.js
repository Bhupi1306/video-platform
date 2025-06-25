const authCheck = async() => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/verify`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ token })
    });
    const data = await response.json();

    return data
}

export default authCheck