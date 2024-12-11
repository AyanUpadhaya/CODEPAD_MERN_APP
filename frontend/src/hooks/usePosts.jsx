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
  const [singlePostError, setSinglePostError] = useState(null); // Error state
  const [singlePostDeleteError, setSinglePostDeleteError] = useState(null); // Error state
  const [singlePostUpdateError, setSinglePostUpdateError] = useState(null); // Error state

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  const END_POINTS = {
    POST: "/posts/add",
    GET: "/posts",
    GET_SINGLE: "/posts", //requires post id afterwards
    PUT: "/posts", //requires post id afterwards
    DELETE: "/posts", //requires post id afterwards
  };

  function getErrorMessage(err) {
    return err.response?.data?.message || err.message || "Something went wrong";
  }

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(END_POINTS["GET"]);
      setPosts(data);
    } catch (err) {
      let message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, END_POINTS["GET"]]);

  // Create a new post
  const createPost = async (postData) => {
    setPosRequestLoading(true);
    setError(null);
    try {
      const { data } = await api.post(END_POINTS["POST"], postData);

      setPosRequestSuccess(true);
      return data?.data;
    } catch (err) {
      let message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setPosRequestLoading(false);
      //await fetchPosts(); // Refetch posts after addition
    }
  };

  // Get a single post by ID
  const getPostById = async (postId) => {
    setLoading(true);
    setSinglePostError(null);
    try {
      const { data } = await api.get(`${END_POINTS["GET_SINGLE"]}/${postId}`);
      return data; // Return the post data
    } catch (err) {
      let message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a post by ID and secret
  const updatePost = async (postId, updateData) => {
    setIsPostUpdating(true);
    setSinglePostUpdateError(null);
    try {
      const { data } = await api.put(
        `${END_POINTS["PUT"]}/${postId}`,
        updateData
      );
      setPosRequestSuccess(true);
      return data?.data;
    } catch (err) {
      let message = getErrorMessage(err);
      setSinglePostUpdateError(message);
      throw new Error(message);
    } finally {
      setIsPostUpdating(false);
    }
  };

  // Delete a post by ID and secret
  const deletePost = async (postId, secret) => {
    setDeleteRequestLoading(true);
    setSinglePostDeleteError(null);
    try {
      await api.delete(`${END_POINTS["DELETE"]}/${postId}`, {
        data: { secret },
      });
    } catch (err) {
      let message = getErrorMessage(err);
      setSinglePostDeleteError(message);
      throw new Error(message);
    } finally {
      setDeleteRequestLoading(false);
      setSinglePostDeleteError(null);
    }
  };

  return {
    posts,
    loading,
    error,
    singlePostError,
    singlePostDeleteError,
    singlePostUpdateError,
    isPosRequestLoading,
    isPosRequestSuccess,
    isDeleteRequestLoading,
    isPostUpdating,
    setPosts,
    fetchPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
  };
};

export default usePosts;
