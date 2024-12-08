import { useState } from "react"
import { login } from "../Services/user";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function tryLogin(){
        if(username.length === 0){
            alert('Username cannot be empty');
        }
        else if(password.length === 0){
            alert('Password cannot be empty');
        }
        else{
            const response = await login(username, password)
            if(response.status === 'ok'){
                const token = response.result;
                sessionStorage.token = token;
                alert("User Logged in")
                navigate('/')
            }
            else{
                alert(response.error)
            }
        }
    }

    return (<div className="min-h-screen bg-gray-800 text-gray-500 p-8">
        <div className="text-2xl font-bold mb-5">Login</div>
        <input
            className="bg-gray-800 border border-gray-700 rounded-sm px-2"
            type='text'
            placeholder="Username" 
            onChange={(e)=>{setUsername(e.target.value)}}
        />
        <input
            className="bg-gray-800 border border-gray-700 ml-3 rounded-sm px-2"
            type='password' 
            placeholder="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}/>

        <br />
        <div className="mt-3 text-xs">Don't have an account? <Link to='/users/register' className="hover:text-gray-400">Register</Link></div>
        <Link to='/users/forgot' className="text-xs hover:text-gray-400">Forgot Password?</Link>
        <br />
        <button
            className="bg-gray-800 border border-gray-700 mt-5 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-violet-600" 
            onClick={tryLogin}
        >Login</button>
    </div>)
}

export default Login