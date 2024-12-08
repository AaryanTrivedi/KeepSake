import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgot } from "../Services/user";

function ForgotPassword(){
    
    const [email,setEmail] = useState('');
    const navigate = useNavigate()

    async function tryForgot(){
        if(email.length === 0){
            alert("Email cannot be empty")
        }
        else{
            const response = await forgot(email)
            if(response === undefined){
                alert("Network error")
            }
            else if(response.status === 'ok'){
                alert("Forgot Password Request Sent to Email")
                navigate('/');
            }
            else{
                alert(response.error)
            }
        }
    }

    return(
        <div className="bg-gray-800 min-h-screen text-gray-500 p-8">
            <h3 className="text-xl font-bold mb-3">Forgot Password</h3>
            <input
                className="bg-gray-800 mb-3 border border-gray-700 rounded-md px-3"
                type="text"
                placeholder="Email"
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <br />
            <button 
                className="bg-gray-800 border border-gray-700 rounded-md px-3 hover:text-amber-500 hover:bg-gray-700"
                onClick={tryForgot}>Send Request</button>
        </div>
    )
}

export default ForgotPassword;