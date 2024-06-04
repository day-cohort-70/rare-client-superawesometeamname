

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AdminHome } from '../components/home/AdminHome';
import { MyPosts } from '../components/home/MyPosts';
import { UserProfiles } from "../components/users/UserProfiles.js"
import { NewPost } from '../components/home/NewPost.jsx';
import { DisplayCategoryManager } from "../components/website-posts/CatManager.jsx"


/* 
import { AdminHome } from "../components/home/AdminHome.jsx"
import { AllPosts } from "../components/AllPosts"; 
import { MyPosts } from "../components/MyPosts"; 
import { TagManager } from "../components/TagManager"; 
import { UserManager } from "../components/UserManager"; 
*/

import { TagsPage } from "../components/tags/TagsPage.jsx"



export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route index element={<NewPost token={token} setToken={setToken}/>} />

        <Route path="/categorymanager" element={<DisplayCategoryManager />} />
        
        {/* Add Routes here 
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/tagmanager" element={<TagManager />} />
        <Route path="/usermanager" element={<UserManager />} />*/}


        
        <Route path="/" element={<AdminHome token={token} setToken={setToken} />} />
        <Route path="/myposts" element={<MyPosts token={token} />} />
        <Route path="/tagmanager" element={<TagsPage />} />
        <Route path="usermanager" element={<UserProfiles />} />

      </Route>
    </Routes>
  );
};
