import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    
    return (
        <div className="navbar navbar-center bg-base-300 mt-12 md:mt-0">
            <a className="btn btn-ghost text-xl mx-4" href="/">Baseball Bucketlist</a>
            <button
                type="button"
                onClick={() => navigate("/profile")}
                className="btn btn-ghost"
            >
                Profile
            </button>
            <div className="ml-auto">
                <UserButton className="absolute top-0 right-0 mt-4 text-sky-500 mx-4" />
            </div>
            <a href="/tubey" className="mr-4 mx-4">Ask Tubey 🌭 </a>
            <a href="/">Search Form</a>
        </div>
    );
}

export default NavBar;