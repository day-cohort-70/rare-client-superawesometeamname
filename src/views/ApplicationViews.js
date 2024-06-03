
import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { UserProfiles } from "../components/users/UserProfiles.js"
import { NewPost } from '../components/home/NewPost.jsx';



{/* 
import { AdminHome } from "../components/home/AdminHome.jsx"
import { AllPosts } from "../components/AllPosts"; 
import { MyPosts } from "../components/MyPosts"; 
import { CategoryManager } from "../components/CategoryManager"; 
import { TagManager } from "../components/TagManager"; 
import { UserManager } from "../components/UserManager"; 
*/}


export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>

        <Route index element={<NewPost token={token} setToken={setToken}/>} />
        <Route path="/UserProfiles" element={<UserProfiles />}/>
        {/* Add Routes here 
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/categorymanager" element={<CategoryManager />} />
        <Route path="/tagmanager" element={<TagManager />} />
        <Route path="/usermanager" element={<UserManager />} />*/}

      </Route>
    </Routes>
  );
};
