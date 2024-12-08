import { useState } from "react"
import { add } from "../Services/post"
import { Link, useNavigate } from "react-router-dom"
import { useCheckToken } from "../Services/user"

export default function AddPost(){

    useCheckToken()

    const [title,setTitle] = useState('')
    const [message,setMessage] = useState('')

    const navigate = useNavigate();

    async function tryAdd(){
        const result = await add(title,message)
        if(result.status === 'ok'){
            alert("Post Added")
            navigate('/users/posts')
        }
        else{
            alert(result.error)
        }
    }

    return(
        <div className="bg-gray-800 min-h-screen p-8 text-gray-500">
            <h1 className="text-gray-500 text-2xl font-bold mb-5">Add a Keep Sake</h1>
            <input 
                className="bg-gray-800 border border-gray-700 rounded-sm px-3"
                type="text"
                onChange={(e)=>{setTitle(e.target.value)}}
                placeholder="Title"
            />
            <br />
            <textarea
                className="bg-gray-800 border border-gray-700 rounded-sm h-10000 w-5000 px-5 mt-5" 
                placeholder="...."
                onChange={(e)=>{setMessage(e.target.value)}}></textarea>
            <br />
            <button
                className="bg-gray-800 border border-gray-700 mt-5 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-violet-600" 
                onClick={tryAdd}>Add</button>

            <Link
                to="/"
                className="bg-gray-800 ml-3 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-amber-500 transition-all"
            >
                Back
            </Link>
        </div>
    )
}