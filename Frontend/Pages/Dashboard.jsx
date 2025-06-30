import { useNavigate } from "react-router-dom"
import logo from "../src/assets/logo.jpg"


const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <>

            <div className=" h-screen sm:pt-30 pt-20 px-2 bg-blue-50">
                <div className=" max-w-lg mx-auto bg-blue-500 px-10 py-15 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-6">
                    <div className={` rounded-full bg-white overflow-hidden border-2 border-gray-200 shadow-md h-25 w-25 flex items-center`}>
                    <img
                        // src="https://via.placeholder.com/150"
                        src={logo}
                        alt="Logo of company"
                        className="object-cover w-full"
                    />
                    </div>
                </div>
                <h1
                className="sm:text-4xl flex justify-center text-gray-100 text-shadow-md text-2xl "
                >
                    Welcome to&nbsp; <span className="underline font-semibold italic">Nirmaan</span>
                </h1>


                <p className=" text-gray-200 sm:mt-20 mt-10 text-shadow-sm">Please login to continue</p>


                <button className="w-full bg-gray-50 sm:py-4 py-3 rounded-sm text-blue-500 text-lg shadow-lg
                hover:shadow-2xl"
                onClick={() => {navigate('/login')}}
                >
                    Login
                </button>
            </div>
            </div>
        </>
    )
}


export default Dashboard