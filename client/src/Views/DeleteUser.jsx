import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, useCheckToken } from "../Services/user";

function DeleteUser(){
    
    useCheckToken()
    const [password,setPassword] = useState('');

    const navigate = useNavigate()

    async function tryDelete(){
        if(0 === password.length){
            alert("Password Cannot be Empty")
        }
        else{
            const response = await deleteUser(password)

            if(response === undefined){
                alert("Network Error")
            }
            else if(response.status === 'ok'){
                alert("User Deleted")
                navigate('/');
            }
            else{
                alert(response.error)
            }
        }
    }

    return(
        <div className="min-h-screen bg-gray-800 text-gray-500 p-8">
            <h3 className="text-2xl font-bold mb-5">Delete User</h3>
            <input
                className="bg-gray-800 border border-gray-700 mt-5 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-gray-900"
                type="password"
                placeholder="Password"
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <br />
            <button
                className="bg-gray-800 border border-gray-700 mt-5 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-red-500"
                onClick={tryDelete}>Delete Account</button>
            <Link
                to="/users/edit"
                className="bg-gray-800 ml-3 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-amber-500 transition-all"
            >
                Back
            </Link>
        </div>
    )
}

export default DeleteUser;