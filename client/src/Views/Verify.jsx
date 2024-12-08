import { useState } from "react";
import { verify } from "../Services/user";
import { useNavigate } from "react-router-dom";

function Verify(){
    
    const [otp,setOtp] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();

    async function tryVerify() {
        if(email.length === 0 ){
            alert('Email cannot be blank');
        }
        else if(otp.length === 0){
            alert('OTP cannot be empty')
        }
        else if(otp.length > 6){
            alert('Invalid OTP')
        }

        const response = await verify(email,otp);
        if(response === undefined){
            alert("Network error")
        }
        else if(response.status === 'ok'){
            alert('User Verified')
            console.log(response);
            navigate('/users/login')
        }
        else{
            alert(response.error)
        }
    }
    
    return (
        <div className="bg-gray-800 min-h-screen text-gray-500 p-8">
            <div className="text-2xl font-bold mb-5">OTP Verification</div>
            <input 
                className="bg-gray-800 px-2 rounded-sm border border-gray-700"
                type="text" 
                placeholder="Email" 
                onChange={(e)=>{setEmail(e.target.value)}} 
            />
            <input
                className="bg-gray-800 px-2 rounded-sm border border-gray-700 ml-3"
                type="text" 
                placeholder="OTP" 
                onChange={(e)=>{setOtp(e.target.value)}} 
            />
            <br />
            <button
                className="bg-gray-800 border border-gray-700 mt-5 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-gray-400"
                onClick={tryVerify}
            >Submit</button>
        </div>
    )
}
export default Verify;