import { useEffect, useState } from "react"
import { archivePost, deletePost, getMy, makePrivate, makePublic } from "../Services/post"
import { Link } from "react-router-dom";
import { useCheckToken } from "../Services/user";

function MyPosts(){
    
    useCheckToken()
    const [posts,setPosts] = useState([]);
    useEffect( ()=>{
        getData()
    },[])

    async function getData() {
        const response = await getMy();
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
            getData();
            alert('Post Deleted')
        }
        else{
            console.log('Error')
        }
    }

    async function archiveData(id) {
        const response = await archivePost(id);
        if(response === undefined){
            setPosts([]);
            alert("Network Error")
        }
        else if(response.status === 'ok'){
            getData();
            alert('Post Archived')
        }
        else{
            console.log('Error')
        }
    }

    async function tryPublic(id) {
        const response = await makePublic(id);
        if(response === undefined){
            setPosts([]);
            alert("Network Error")
        }
        else if(response.status === 'ok'){
            getData();
            alert('Post is now Public')
        }
        else{
            console.log('Error')
        }
    }

    async function tryPrivate(id) {
        const response = await makePrivate(id);
        if(response === undefined){
            setPosts([]);
            alert("Network Error")
        }
        else if(response.status === 'ok'){
            getData();
            alert('Post is now Private')
        }
        else{
            console.log('Error')
        }
    }
    
    return (
        <div className="min-h-screen bg-gray-800 p-8 text-gray-500">
            <h1 className="text-2xl font-bold mb-5 hover:text-gray-300 transition-all">
                My KeepSake
            </h1>
            <Link
                to="/"
                className="bg-gray-800 mt-5 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-amber-500 transition-all"
            >
                Back
            </Link>
            <Link
                to="/posts/add"
                className="bg-gray-800 border border-gray-700 mt-5 ml-3 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-emerald-500 transition-all"
            >
                What's on your mind?
            </Link>
            <Link
                to="/users/archived"
                className="bg-gray-800 border border-gray-700 mt-5 ml-3 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-indigo-500 transition-all"
            >
                Archived
            </Link>

            <br />
            <br />
            {posts.length === 0 && <div className="text-center text-lg text-gray-500 mt-12">There are no posts</div>}
            {posts.length > 0 && <div className="space-y-5 space-x-5">
                {posts.map((post,index)=>{
                return(
                    <div
                key={index}
                className="inline-block bg-gray-800 border border-gray-600 ml-5 rounded-md shadow-xs hover:shadow-xl hover:border-indigo-400 transition-all p-2"
              >
                <h2 className="text-md font-bold text-gray-500 px-4 py-2">
                  {post.title}
                </h2>
                <br />
                <p className="text-gray-400 text-sm px-3">{post.message}</p>
                <br />
                <p className="text-xs text-gray-600 px-2 mb-2">
                  <span className="font-semibold">Likes:</span> {post.likes} |{" "}
                  <br />
                  <span className="font-semibold">Created At:</span>{" "}
                  {new Date(post.createTime).toLocaleString()}
                </p>
                    <div>{post.isPublic === 1 && <button 
                    className="bg-gray-800 border border-gray-700 mt-2 px-3 py-0.5 rounded-md hover:bg-gray-700 hover:text-cyan-500"
                    onClick={()=>{tryPrivate(post.id)}}>Make Private</button>}</div>
                    <div>{post.isPublic === 0 && <button
                    className="bg-gray-800 border border-gray-700 mt-2 px-3 py-0.5 rounded-md hover:bg-gray-700 hover:text-indigo-500"
                    onClick={()=>{tryPublic(post.id)}}>Make Public</button>}</div>
                    <div><button 
                            className="bg-gray-800 border border-gray-700 mt-2 px-3 py-0.5 rounded-md hover:bg-gray-700 hover:text-amber-500"
                            onClick={()=>{archiveData(post.id)}}>Archive</button></div>
                    <div><button 
                            className="bg-gray-800 border border-gray-700 mt-2 px-3 py-0.5 rounded-md hover:bg-gray-700 hover:text-red-500"
                            onClick={()=>{deleteData(post.id)}}>Delete</button></div>
                    </div>
                )
            })}</div>}
        </div>
    )
}

export default MyPosts;