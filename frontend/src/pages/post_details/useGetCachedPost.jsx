import { usePostContext } from "../../context/PostContext";

export default function useGetCachedPost(postId) {
  const { posts } = usePostContext();
  const filteredPost = posts.find((item) => item.id == postId);

  return filteredPost;
}
