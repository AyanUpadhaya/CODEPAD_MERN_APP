import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const usePosts = () => {
  const [posts, setPosts] = useState([]); // Stores all posts
  const [loading, setLoading] = useState(false); // Loading state
  const [isPosRequestLoading, setPosRequestLoading] = useState(false); // Loading state
  const [isDeleteRequestLoading, setDeleteRequestLoading] = useState(false); // Loading state
  const [isPostUpdating, setIsPostUpdating] = useState(false); // Loading state
  const [isPosRequestSuccess, setPosRequestSuccess] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const API_BASE_URL = import.meta.env.VITE_BASE_URL; // Replace with your API URL
  const END_POINTS = {
    POST: "/posts/add",
    GET: "/posts",
    GET_SINGLE: "/posts", //requires post id afterwards
    PUT: "/posts", //requires post id afterwards
    DELETE: "/posts", //requires post id afterwards
  };

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(API_BASE_URL + END_POINTS["GET"]);
      setPosts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new post
  const createPost = async (postData) => {
    setPosRequestLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        API_BASE_URL + END_POINTS["POST"],
        postData
      );
      setPosts((prevPosts) => [...prevPosts, data.data]); // Append the new post
      setPosRequestSuccess(true);
      return data?.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post.");
    } finally {
      setPosRequestLoading(false);
    }
  };

  // Get a single post by ID
  const getPostById = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL + END_POINTS["GET_SINGLE"]}/${postId}`
      );
      return data; // Return the post data
    } catch (err) {
      setError(err.response?.data?.message || "Post not found.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a post by ID and secret
  const updatePost = async (postId, updateData) => {
    setIsPostUpdating(true);
    setError(null);
    try {
      const { data } = await axios.put(
        `${API_BASE_URL + END_POINTS["PUT"]}/${postId}`,
        updateData
      );

      setPosRequestSuccess(true);

      return data?.data;
    } catch (err) {
      throw new Error(err.response?.data?.message);
      console.log({ err });
    } finally {
      setIsPostUpdating(false);
    }
  };

  // Delete a post by ID and secret
  const deletePost = async (postId, secret) => {
    setDeleteRequestLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL + END_POINTS["DELETE"]}/${postId}`, {
        data: { secret },
      });
    } catch (err) {
      throw new Error(err.response?.data?.message);
    } finally {
      setDeleteRequestLoading(false);
    }
  };

  // Automatically fetch posts when the hook is used
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    isPosRequestLoading,
    isPosRequestSuccess,
    isDeleteRequestLoading,
    isPostUpdating,
    error,
    fetchPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
  };
};

export default usePosts;
