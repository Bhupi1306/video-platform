import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.jpg";
import Navbar from "./Navbar";


const Form = ({fullName = true, backendUrl = "", type="", headerText=""}) => {

    const [data, setData] = useState({})
    const navigate = useNavigate();
    const [showLogo, setShowLogo] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(type === "Login")
            setShowLogo(true)
        const apiLoad = async (token) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/verify`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                const data = await response.json();
                if(type === "Login")
                {
                    if(data.success)
                    {
                        return navigate('/home')
                    }
                }

                else if(type === "Registeration") 
                {
                    if(!data.isAdmin)
                    {
                        navigate('/login')
                    }
                }

            } catch (error) {
                console.error("Error fetching visitor data:", error);
                navigate("/login");
            }
        }

        if(token){
            apiLoad(token)
        }
        else 
        {
            navigate('/login')
        }

    }, [navigate]);




    const showStyle = (attribute) => {
        if (attribute) {
            return "";
        }
        return "hidden";
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if((!data.email || !data.password) || (fullName && !data.fullName)) {
            alert("Please fill all fields");
            return;
        }

        
        try {
            const url = backendUrl;
            const response = await fetch(url, {
                  method: "POST",
                  headers: {
                    'content-type':'application/json'
                  },
                body: JSON.stringify(data)
              })
              const result = await response.json()

              if (result.success) {
                  setData({});
                  if(type === "Registeration") 
                    {
                        alert(`Registration successful!`);
                    }
                  if (type === "Login") {
                    localStorage.setItem("token", result.jwtToken);
                    localStorage.setItem("name", result.name);
                    localStorage.setItem("email", result.email)
                    navigate("/home");
                  }
              } else {
                  alert(`${type} failed: ` + result.message);
              }

        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again later.");
            return;
            
        }
    }

    return (
        <>
            <Navbar/>
            <section className={`${showLogo ? "sm:mt-20 mt-10": "mt-5"}`}>
                <div className="max-w-md mx-auto p-8 py-12 bg-white rounded-xl shadow-lg">
                    <div
                    className="">
                        {showLogo &&
                        <div className="flex items-center justify-center mb-6">
                            <div className={` rounded-full overflow-hidden border-2 border-gray-200 shadow-md h-20 w-20 flex items-center`}>
                            <img
                                // src="https://via.placeholder.com/150"
                                src={logo}
                                alt="Logo of company"
                                className="object-cover w-full"
                            />
                            </div>
                        </div>
                        }
                    <h1 className="text-2xl font-bold text-center">{headerText}</h1>
                    <div className="mt-8">
                        <div className="mt-6">
                        <form className="space-y-7">
                            <div className={showStyle(fullName)}> 
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-600"> Full Name </label>
                            <div className="mt-1">
                                <input value={data?.fullName || ""} onChange={handleChange} id="fullName" name="fullName" type="text" autoComplete="fullName" required placeholder="Your Full Name"
                                className="block w-full px-5 py-3 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-2xl bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                            </div>
                            </div>


                            <div>
                            <label htmlFor="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" className="block text-sm font-medium text-gray-600"> Email address </label>
                            <div className="mt-1">
                                <input value={data?.email || ""} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required placeholder="Your Email"
                                className="block w-full px-5 py-2 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                            </div>
                            </div>

                            <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600"> Password </label>
                            <div className="mt-1">
                                <input value={data?.password || ""} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required
                                placeholder="Your Password"
                                className="block w-full px-5 py-2 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                            </div>
                        </div>

                            <div className="mt-8">
                            <button type="submit" onClick={handleSubmit}
                                className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200">Sign
                                in</button>
                            </div>
                        </form>                     
                       
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Form