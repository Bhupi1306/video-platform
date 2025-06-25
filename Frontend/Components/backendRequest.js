const backendRequest = async (url, method , data="") => {

    if(method === "POST"){
        const response = await fetch(url, {
            method: "POST",
            headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify(data)

    })
    const result = await response.json()
    return result
    }

    else if(method === "GET")
    {
        const response = await fetch(url, {
            method: "GET",
            headers: {
            'content-type':'application/json'
        }

    })
    const result = await response.json()
    return result
    }
}

export {backendRequest}