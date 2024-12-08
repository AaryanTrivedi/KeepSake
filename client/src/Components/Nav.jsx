import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Services/user";

function Nav(){

    const navigate = useNavigate()
    function logOut(){
        logout()
        navigate('/users/login')
    }
    return(
        <div>
        <nav className="flex justify-between items-center py-2 bg-gray-800 border border-gray-700 text-gray-500 font-semibold px-4">
            <div>
                <Link className="hover:text-gray-400" to="/">Home</Link>
            </div>
            <div className="flex space-x-4">
                <Link className="hover:text-gray-400" to="users/edit">Profile</Link>
                <button className="hover:text-red-400" onClick={logOut}>Bye!</button>
            </div>
        </nav>
    </div>
    )
}

export default Nav;