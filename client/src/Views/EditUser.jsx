import { useEffect, useState } from "react";
import { editDetails, getDetails, useCheckToken } from "../Services/user";
import { Link } from "react-router-dom";

function EditUser() {

    useCheckToken()
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');

    async function loadDetails() {
        const response = await getDetails();
        if(response === undefined){
            alert("Network error")
        }
        else if (response.status === 'ok') {
            const val = response.result[0];
            setFirstname(val.firstname);
            setLastname(val.lastname);
            setUsername(val.username);
            setBio(val.bio);
            setEmail(val.email);
        } 
        else 
        {
            console.error('Failed to load user details');
        }
    }

    async function updateDetails(){
        const response = await editDetails(firstname,lastname,bio)
        if(response.status === 'ok'){
            alert('Details Updated')
        }
    }

    useEffect(() => {
        loadDetails();
    }, []);







    return (
        <div className="min-h-screen bg-gray-800 text-gray-500 p-8">
            <h1 className="text-2xl font-bold mb-5">Profile</h1>
            <Link
                to="/"
                className="bg-gray-800 mb-3 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-amber-500 transition-all"
            >
                Back
            </Link>
            <br />
            <br />
            <label htmlFor="">Firstname: </label>
            <br />
            <input
                className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-3"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
            />
            <br />
            <label htmlFor="">Lastname: </label>
            <br />
            <input
                className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-3"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name"
            />
            <br />
            <label htmlFor="">Username: </label>
            <br />
            <input
                readOnly
                className="bg-gray-700 border border-gray-700 rounded-sm mb-2 px-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <br />
            <label htmlFor="">Bio: </label>
            <br />
            <input
                className="bg-gray-800 border border-gray-700 rounded-sm mb-2 px-3"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
            />
            <br />
            <label htmlFor="">Email: </label>
            <br />
            <input
                className="bg-gray-700 border border-gray-700 rounded-sm mb-2 px-3"
                readOnly
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <br />
            <button 
                className="bg-gray-800 border border-gray-700 mt-5 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-gray-900"
                onClick={updateDetails}>Edit</button>
            <Link to='/users/update-password'><button 
                className="bg-gray-800 border border-gray-700 mt-5 ml-2 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-amber-400"
                >Change Password</button></Link>
            <Link to='/users/delete'><button 
                className="bg-gray-800 border border-gray-700 mt-5 ml-2 px-7 py-0.5 rounded-md hover:bg-gray-700 hover:text-red-400"
                >Delete</button></Link>
        
        </div>
    );
}

export default EditUser;
