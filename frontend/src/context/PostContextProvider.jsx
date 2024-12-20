import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { langdata } from "../utils/langdata";

import usePosts from "../hooks/usePosts";
import { PostContext } from "./contexts";

export default function PostContextProvider({ children }) {
  const {
    posts,
    setPosts,
    error,
    singlePostError,
    singlePostDeleteError,
    singlePostUpdateError,
    loading,
    fetchPosts,
    getPostById,
    deletePost,
    isDeleteRequestLoading,
    isPostRequestLoading,
  } = usePosts();

  const [language, setLanguage] = useState("javascript");
  const [searchValue, setSearchValue] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  const onSelect = (language) => {
    setLanguage(language);
  };

  const handleNewPost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
  };
  const handleDeletePost = (postId) => {

    const temp = [...posts];
    const itemIndx = temp.findIndex((item) => item.id == postId);
    temp.splice(itemIndx, 1);
    setPosts(temp);
    console.log(temp);
  };
  const handlePostUpadate = (postId, updateData) => {
    const localTemp = [...posts];
    const itemIndx = localTemp.findIndex((item) => item.id == postId);
    localTemp[itemIndx] = { ...localTemp[itemIndx], ...updateData };
    setPosts(localTemp);
  };

  //sort by timestamp
  const sortByTime = (a, b) => {
    if (isAscending) {
      return a.timestamp - b.timestamp;
    } else {
      return b.timestamp - a.timestamp;
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts().catch((err) => {
        console.log(err);
      });
    }
  }, [fetchPosts, posts.length]);

  const postObj = {
    posts,
    error,
    singlePostError,
    loading,
    language,
    setLanguage,
    searchValue,
    setSearchValue,
    onSelect,
    sortByTime,
    langdata,
    getPostById,
    deletePost,
    isDeleteRequestLoading,
    isPostRequestLoading,
    handleNewPost,
    handleDeletePost,
    handlePostUpadate,
  };

  return (
    <PostContext.Provider value={postObj}>{children}</PostContext.Provider>
  );
}

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostContextProvider");
  }
  // const { posts, loading, error } = context;
  return context;
};
