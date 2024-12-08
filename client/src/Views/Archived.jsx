import { useEffect, useState } from "react"
import { unarchivePost, deletePost, getArchive } from "../Services/post"
import { useCheckToken } from "../Services/user";
import { Link } from "react-router-dom";

function Archived(){

    useCheckToken()
    
    const [posts,setPosts] = useState([]);
    useEffect( ()=>{
        getArchived()
    },[])

    async function getArchived() {
        const response = await getArchive();
        if(response === undefined){
            setPosts([]);
            alert("Network Error")
        }
        else if(response.status === 'ok'){
            setPosts(response.result);
        }
        else{
            console.log('Error')
        }
    }
    async function deleteData(id) {
        const response = await deletePost(id);
        if(response === undefined){
            setPosts([]);
            alert("Network Error")
        }
        else if(response.status === 'ok'){
            getArchive();
            alert('Post Deleted')
        }
        else{
            console.log('Error')
        }
    }

    async function unarchiveData(id) {
        const response = await unarchivePost(id);
        if(response === undefined){
            setPosts([]);
            alert("Network Error")
        }
        else if(response.status === 'ok'){
            getArchived();
            alert('Post Unarchived')
        }
        else{
            console.log('Error')
        }
    }
    
    return (
        <div className="bg-gray-800 min-h-screen p-8 text-gray-500">
            <h1 className="text-2xl font-bold mb-5">Secret's Well Kept</h1>
            <Link
                to="/users/posts"
                className="bg-gray-800 mt-5 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-amber-500 transition-all"
            >
                Back
            </Link>

            <br />
            <br />

            {posts.length === 0 && <div className="text-center text-lg text-gray-500 mt-12">There are no posts</div>}
            {posts.length > 0 && 
            <div className="space-y-5 space-x-5">{
            posts.map((post,index)=>{
                return(
                    <div key={index+1}
                        className="inline-block bg-gray-800 border border-gray-600 ml-5 rounded-md shadow-xs hover:shadow-xl hover:border-indigo-400 transition-all p-2"
                    >
                    <div
                        className="text-md font-bold text-gray-500 px-4 py-2"
                    >{post.title}</div>
                    <div
                        className="text-gray-400 text-sm px-3"
                    >{post.message}</div>
                    <p className="text-xs text-gray-600 px-2 mb-2">
                        <span className="font-semibold">Likes:</span> {post.likes} |{" "}
                        <br />
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(post.createTime).toLocaleString()}
                    </p>
                    <div><button 
                            className="bg-gray-800 border border-gray-700 mt-2 px-3 py-0.5 rounded-md hover:bg-gray-700 hover:text-amber-500"
                            onClick={()=>{unarchiveData(post.id)}}>Unarchive</button></div>
                    <div><button 
                            className="bg-gray-800 border border-gray-700 mt-2 px-3 py-0.5 rounded-md hover:bg-gray-700 hover:text-red-500"
                            onClick={()=>{deleteData(post.id)}}>Delete</button></div>
                    </div>
                )
            })}</div>}
            <br/>
            <br/>
        </div>
    )
}

export default Archived;