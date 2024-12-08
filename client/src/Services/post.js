import axios from "axios";
import { generateUrl } from "../config";

export async function getAll(){
    try{
        const url = generateUrl('posts/all');
        const token = sessionStorage.getItem('token');
        const response = await axios.get(url,{
            headers:{
                token,
            }
        })
    return response.data
    }catch(ex){
        console.log(ex)
    }
}

export async function getMy(){
    try{
        const url = generateUrl('posts/my');
        const token = sessionStorage.getItem('token');
        const response = await axios.get(url,{
            headers:{
                token,
            }
        })
    return response.data
    }catch(ex){
        console.log(ex)
    }
}

export async function getArchive(){
    try{
        const url = generateUrl('posts/archived');
        const token = sessionStorage.getItem('token');
        const response = await axios.get(url,{
            headers:{
                token,
            }
        })
    return response.data
    }catch(ex){
        console.log(ex)
    }
}

export async function add(title,message) {
    try{
        const url = generateUrl('posts/add')
        const body = {
            title,message,
        }
        const token = sessionStorage.getItem('token')
        const response = await axios.post(url,body,{
            headers:{
                token
            }
        })

        return response.data;

    }catch(ex){
        console.log(ex);
    }
}

export async function deletePost(id){
    try{
        const url = generateUrl(`posts/delete/${id}`);
        const token = sessionStorage.getItem('token');
        const response = await axios.patch(url,{},{
            headers:{
                token
            }
        })

        return response.data;
    }catch(ex){
        console.log(ex);
    }
}

export async function archivePost(id){
    try{
        const url = generateUrl(`posts/archive/${id}`);
        const token = sessionStorage.getItem('token');
        const response = await axios.patch(url,{},{
            headers:{
                token
            }
        })

        return response.data;
    }catch(ex){
        console.log(ex);
    }
}

export async function unarchivePost(id){
    try{
        const url = generateUrl(`posts/unarchive/${id}`);
        const token = sessionStorage.getItem('token');
        const response = await axios.patch(url,{},{
            headers:{
                token
            }
        })

        return response.data;
    }catch(ex){
        console.log(ex);
    }
}

export async function makePrivate(id){
    try{
        const url = generateUrl(`posts/private/${id}`);
        const token = sessionStorage.getItem('token');
        const response = await axios.patch(url,{},{
            headers:{
                token
            }
        })

        return response.data;
    }catch(ex){
        console.log(ex);
    }
}

export async function makePublic(id){
    try{
        const url = generateUrl(`posts/public/${id}`);
        const token = sessionStorage.getItem('token');
        const response = await axios.patch(url,{},{
            headers:{
                token
            }
        })

        return response.data;
    }catch(ex){
        console.log(ex);
    }
}