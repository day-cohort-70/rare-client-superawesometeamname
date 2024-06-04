import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../managers/PostManager"; // Adjust the path as needed

export const PostDetail = ({ token }) => {
  const title = useRef();
  const imageUrl = useRef();
  const content = useRef();
  const category = useRef();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  return <>Hello</>;
};
