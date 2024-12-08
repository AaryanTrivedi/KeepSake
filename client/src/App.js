import { Routes,Route} from 'react-router-dom';
import './App.css';
import Login from './Views/Login';
import Register from './Views/Register';
import Verify from './Views/Verify';
import Nav from './Components/Nav';
import ForgotPassword from './Views/ForgotPassword';
import ChangePassword from './Views/ChangePassword';
import DeleteUser from './Views/DeleteUser';

import Home from './Views/Home';
import EditUser from './Views/EditUser';
import AddPost from './Views/AddPost';
import MyPosts from './Views/MyPosts';
import Archived from './Views/Archived';


function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='users/posts' element={<MyPosts/>} />
        <Route path='users/archived' element={<Archived/>} />
        <Route path='users/login' element={<Login/>} />
        <Route path='users/register' element={<Register/>} />
        <Route path='users/otp' element={<Verify/>} />
        <Route path='users/forgot' element={<ForgotPassword/>} />
        <Route path='users/update-password' element={<ChangePassword/>} />
        <Route path='users/delete' element={<DeleteUser />} />
        <Route path='users/edit' element={<EditUser />} />
        <Route path='posts/add' element={<AddPost />} />

      </Routes>
    </div>
  );
}

export default App;
