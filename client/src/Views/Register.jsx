import { useState } from "react"
import { register } from "../Services/user";
import { Link, useNavigate } from "react-router-dom";

function Register(){
    
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    async function tryRegister(){
        if(firstname.length === 0){
            alert('First Name cannot be empty');
            return
        }
        else if(lastname.length === 0){
            alert('Last Name cannot be empty');
            return
        }
        else if(username.length === 0){
            alert('Username cannot be empty');
            return
        }
        else if(email.length === 0){
            alert('Email cannot be empty');
            return
        }
        else if(password.length === 0){
            alert('Password cannot be empty');
            return
        }
        else if(confirmPassword.length === 0){
            alert('Confirm Password cannot be empty');
            return
        }
        else if(password !== confirmPassword){
            alert('Mismatch between password and confirm password');
            return
        }
        else{
            const response = await register(firstname,lastname,username,email,password)
            if(response === undefined){
                alert("Network error")
            }
            else if(response.status === 'ok'){
                alert("User Registered")
                navigate('/users/otp')
            }
            else{
                alert(response.error)
            }
        }
    }

    return (<div className="min-h-screen bg-gray-800 text-gray-500 p-8">
        <div className="text-2xl font-bold mb-5">Register</div>
        <input  
            className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-2"
            type='text' 
            placeholder="Firstname" 
            onChange={(e)=>{setFirstname(e.target.value)}}
        />
        <input
            className="bg-gray-800 border border-gray-700 ml-3 rounded-sm mb-2 px-2"
            type='text' 
            placeholder="Lastname" 
            onChange={(e)=>{setLastname(e.target.value)}}
        />
        <br />
        <input
            className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-2"
            type='text' 
            placeholder="Username" 
            onChange={(e)=>{setUsername(e.target.value)}}
        />
        <input
            className="bg-gray-800 border border-gray-700 ml-3 rounded-sm mb-2 px-2"
            type='text' 
            placeholder="Email" 
            onChange={(e)=>{setEmail(e.target.value)}}
        />
        <br />
        <input
            className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-2"
            type='password' 
            placeholder="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
        />
        <input
            className="bg-gray-800 border border-gray-700 ml-3 rounded-sm mb-2 px-2"
            type='password' 
            placeholder="Confirm Password" 
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
        />
        <br />
        <div className="mt-3 text-xs">Already have an account? <Link to='/users/login' className="hover:text-gray-400">Login</Link></div>
        <br />
        <button
            className="bg-gray-800 border border-gray-700 mt-5 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-gray-900"
            onClick={tryRegister}>Register</button>
    </div>)
}

export default Register