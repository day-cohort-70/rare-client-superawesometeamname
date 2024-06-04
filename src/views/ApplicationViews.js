

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AdminHome } from '../components/home/AdminHome';
import { MyPosts } from '../components/home/MyPosts';
import { UserProfiles } from "../components/users/UserProfiles.js"
import { NewPost } from '../components/home/NewPost.jsx';
import { TagsPage } from "../components/tags/TagsPage.jsx"


export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route index element={<NewPost token={token} setToken={setToken}/>} />
        <Route path="/UserProfiles" element={<UserProfiles />} />
        <Route path="/" element={<AdminHome token={token} setToken={setToken} />} />
        <Route path="/myposts" element={<MyPosts token={token} />} />
        <Route path="/tagmanager" element={<TagsPage />} />
        <Route path="usermanager" element={<UserManager />} />*/      
        {/* Add Routes here 
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/categorymanager" element={<CategoryManager />} />
        <Route path="/usermanager" element={<UserManager />} />*/}
      </Route>
    </Routes>
  );
};
