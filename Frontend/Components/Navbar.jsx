import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <nav className="bg-white  px-6 flex justify-between items-center">
      <div className="text-2xl font-semibold text-blue-600 mt-2" onClick={() => {navigate('/home')}}>
        <img src={logo} alt="Logo" className="md:h-15 sm:h-12 h-12" />
        </div>

        <ul>
          <li>Upload</li>
          <li>Categories</li>
        </ul>
      <div className="space-x-5">
        {isAdmin &&(<button
          onClick={handleNewUser}
          className="md:px-4 md:py-2 px-2 py-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          New User
        </button>)}
        
        <button
          onClick={handleLogout}
          className="md:px-5 md:py-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
    )}
    </>
  );
}

//TLTD
// Make the buttons representable and responsive
