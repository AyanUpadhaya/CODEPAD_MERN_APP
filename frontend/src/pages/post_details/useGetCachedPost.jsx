import { usePostContext } from "../../context/PostContext";

export default function useGetCachedPost(postId) {
  const { cachedPost } = usePostContext();
  const filteredPost = cachedPost.find((item) => item.id == postId);

  return filteredPost;
}
