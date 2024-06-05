

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AdminHome } from '../components/home/AdminHome';
import { MyPosts } from '../components/home/MyPosts';
import { UserProfiles } from "../components/users/UserProfiles.js"
import { NewPost } from '../components/home/NewPost.jsx';
import { PostDetail } from '../components/home/PostDetail';
import { DisplayCategoryManager } from "../components/website-posts/CatManager.jsx"
import { TagsPage } from "../components/tags/TagsPage.jsx"

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />

      {/* Protected Routes */}
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<AdminHome token={token} setToken={setToken} />} />
        <Route path="/posts" element={<MyPosts token={token} />} />
        <Route path="/newpost" element={<NewPost token={token} />} />
        <Route path="/posts/:post_id" element={<PostDetail token={token} />} />
        <Route path="/categorymanager" element={<DisplayCategoryManager />} />
        <Route path="/tagmanager" element={<TagsPage />} />
        <Route path="usermanager" element={<UserProfiles />} />
      </Route>
    </Routes>
  );
};
