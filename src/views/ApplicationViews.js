
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AdminHome } from '../components/home/AdminHome';
import { MyPosts } from '../components/home/MyPosts';

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<AdminHome token={token} setToken={setToken} />} />
        <Route path="/myposts" element={<MyPosts token={token} />} />
        {/* Uncomment these routes as needed */}
        {/*<Route path="allposts" element={<AllPosts />} /> */}
        {/*<Route path="categorymanager" element={<CategoryManager />} />
        <Route path="tagmanager" element={<TagManager />} />
        <Route path="usermanager" element={<UserManager />} />*/}
      </Route>
    </Routes>
  );
};
