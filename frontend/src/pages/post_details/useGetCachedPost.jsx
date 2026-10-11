import { usePostContext } from "../../context/PostContextProvider";

export default function useGetCachedPost(postKey) {
  const { posts } = usePostContext();
  const filteredPost = posts.find(
    (item) => String(item.id) === postKey || item.slug === postKey
  );

  return filteredPost;
}
