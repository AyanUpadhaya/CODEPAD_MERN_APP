import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { langdata } from "../utils/langdata";

import usePosts from "../hooks/usePosts";

export const PostContext = createContext(null);

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
    isPosRequestLoading,
  } = usePosts();
  const [language, setLanguage] = useState("javascript");
  const [searchValue, setSearchValue] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [cachedPost, setCachedPost] = useState([]);

  const onSelect = (language) => {
    setLanguage(language);
  };

  const handleNewPost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
  };
  const handleDeletePost = (postId) => {
    // const updated = [...posts].filter((post) => post.id !== postId);
    // setPosts(updated);

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

  const invalidateCache = () => {
    setCachedPost([]);
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
    cachedPost,
    setCachedPost,
    getPostById,
    deletePost,
    isDeleteRequestLoading,
    isPosRequestLoading,
    handleNewPost,
    invalidateCache,
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
