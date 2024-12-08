import axios from "axios";
import { generateUrl } from "../config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export async function login(username,password){
    try{
        const url = generateUrl('users/login');
        const body = {
            username,
            password,
        }
        const response = await axios.post(url,body);
        return response.data;
    }catch(ex){
        return ex;
    }
}

export function logout(){
    if(sessionStorage.token === undefined){
        alert('You are not logged in')
    }
    else{
        sessionStorage.removeItem('token')
    }
}

export async function register(firstname,lastname,username,email,password){
    try{
        const url = generateUrl('users/register');
        console.log(url);
        const body = {
            firstname,
            lastname,
            email,
            username,
            password,
        }
        const response = await axios.post(url,body);
        console.log(response);
        return response.data;
    }catch(ex){
        return ex;
    }
}

export async function verify(email,otp){
    try{
        const url = generateUrl('users/verify')
        const body = {
            email,
            otp,
        }
        const response = await axios.patch(url,body);
        return response.data;
    }
    catch(ex){
        console.log(ex);
    }
}

export async function forgot(email){
    try{
        const url = generateUrl('users/forgot')
        const body = {
            email,
        }
        const response = await axios.post(url,body);
        return response.data;
    }
    catch(ex){
        console.log(ex);
    }
}

export async function change(password,updatedPassword){
    try{
        const url = generateUrl('users/change/password')
        const body = {
            password,
            updatedPassword,
        }
        const token = sessionStorage.getItem('token');
        const response = await axios.patch(url,body,{
            headers:{
                token,
            }
        });
        return response.data;
    }
    catch(ex){
        console.log(ex);
    }
}

export async function deleteUser(password){
    try{
        const url = generateUrl('users/account/delete')
        const body = {
            password,
        }
        const token = sessionStorage.getItem('token');
        const response = await axios.patch(url,body,{
            headers:{
                token,
            }
        });
        return response.data;
    }
    catch(ex){
        console.log(ex);
    }
}

export async function getDetails() {
    try
    {
        const url = generateUrl('users/edit');
        const token = sessionStorage.getItem('token');
        const response = await axios.get(url,{
            headers:{
                token,
            }
        });
        return response.data;

    }catch(ex){
        console.log(ex);
    }
}

export async function editDetails(firstname,lastname,bio) {
    try
    {
        const url = generateUrl('users/edit');
        const token = sessionStorage.getItem('token');
        const body = {
            firstname,
            lastname,
            bio,
        }
        const response = await axios.put(url,body,{
            headers:{
                token,
            }
        });
        return response.data;

    }catch(ex){
        console.log(ex);
    }
}


export function useCheckToken(){
    const navigate = useNavigate()
    useEffect(()=>{
        if(sessionStorage.token === undefined){
            navigate('/users/login')
        }
    },[navigate])
}