import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.jpg"


export default function Navbar() {
    const navigate = useNavigate()

    const [showNav, setShowNav] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);

    useEffect(() => {

    const token = localStorage.getItem("token");
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

            if (!data.success) {
                console.error("User verification failed:", data.message);
                setShowNav(false);
            } else {
                setShowNav(true);
                if (data.isAdmin) {
                    setisAdmin(true);
                } else {
                    setisAdmin(false);
                }
            }

        } catch (error) {
            console.error("Error fetching user data:", error);
            setShowNav(false);
        }
    }

    if(token) {
        apiLoad(token);
        } else {
        setShowNav(false);
    }
  }, [showNav,setShowNav, isAdmin, setisAdmin, navigate, localStorage]);


  const handleLogout = () => {
    localStorage.clear()
    navigate("/login");
  };

  const handleNewUser = () => {
    navigate('/register')
  };


  return (
    <>
    {showNav && (
    <nav className="bg-white  px-6 flex justify-between items-center flex-wrap">
      <div className="text-2xl font-semibold text-blue-600 mt-2" onClick={() => {navigate('/home')}}>
        <img src={logo} alt="Logo" className="md:h-15 sm:h-12 h-12" />
        </div>


        <div className="space-x-5 order-2 sm:order-3">
        {/* {isAdmin &&(<button
          onClick={handleNewUser}
          className="md:px-4 md:py-2 px-2 py-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          New User
        </button>)} */}
        
        <button
          onClick={handleLogout}
          className="md:px-5 md:py-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Logout
        </button>
      </div>

        <div className="order-3 sm:order-2 w-full sm:w-auto 
          bg-blue-50 p-2 text-sm sm:text-base sm:bg-white sm:p-0
        ">
          <ul className="flex justify-between sm:w-110 cursor-default font-semibold">
            <NavLink className="sm:mr-7 mr-2 nav_links" to="/home">Home</NavLink>
            <NavLink className="sm:mr-7 mr-2 nav_links " to="/video/upload">Upload</NavLink>
            <NavLink className="sm:mr-7 mr-2 nav_links" to="/categories">Categories</NavLink>
            <NavLink className="nav_links" to="/register">New User</NavLink>
        </ul>
        </div>
      
    </nav>
    )}
    </>
  );
}
