import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { change, useCheckToken } from "../Services/user";

function ChangePassword(){

    useCheckToken()
    
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const navigate = useNavigate()

    async function tryForgot(){
        if( oldPassword.length       === 0       ||
            newPassword.length       === 0       ||
            confirmPassword.length   === 0       ||
            newPassword.length       === confirmPassword
        ){
            alert("Field cannot be empty")
        }
        else{
            const response = await change(oldPassword,newPassword)
            if(response === undefined){
                alert("Network Error")
            }
            else if(response.status === 'ok'){
                alert("Password Updated")
                navigate('/');
            }
            else{
                alert(response.error)
            }
        }
    }

    return(
        <div className="min-h-screen bg-gray-800 text-gray-500 p-8">
            <h3 className="text-2xl font-bold mb-5">Change Password</h3>
            <input
                className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-2"
                type="password"
                placeholder="Old Password"
                onChange={(e)=>{setOldPassword(e.target.value)}}
            />
            <br />
            <input
                className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-2"
                type="password"
                placeholder="New Password"
                onChange={(e)=>{setNewPassword(e.target.value)}}
            />
            <br />
            <input
                className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-2"
                type="password"
                placeholder="Confirm New Password"
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
            <br />
            <button 
                className="bg-gray-800 border border-gray-700 mt-5 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-gray-900"
                onClick={tryForgot}>Update Password</button>
            <Link
                to="/users/edit"
                className="bg-gray-800 ml-3 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-amber-500 transition-all"
            >
                Back
            </Link>
        </div>
    )
}

export default ChangePassword;