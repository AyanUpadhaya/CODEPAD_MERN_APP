import { useNavigate, useParams } from "react-router-dom";
import NoData from "../../components/shared/NoData";
import { If, Then, Else } from "react-if";
import { useEffect, useState } from "react";
import SinglePostCards from "../../components/cards/SinglePostCards";
import SearchLoader from "../../components/shared/SearchLoader";
import { CodeViewModal, ConfirmationModal } from "../../components/modals";
import { errorNotify, infoNotify } from "../../utils/getNotify";
import RequestLoader from "../../components/shared/RequestLoader";
import BackToPrev from "../../components/shared/BackToPrev";
import useGetCachedPost from "./useGetCachedPost";
import { usePostContext } from "../../context/PostContextProvider";

const PostDetails = () => {
  const { postKey } = useParams();
  const filteredData = useGetCachedPost(postKey);

  const {
    singlePostError,
    getPostById,
    getPostBySlug,
    deletePost,
    isDeleteRequestLoading,
    handleDeletePost,
  } = usePostContext();
  const [postData, setPostData] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [secretKey, setSecertKey] = useState("");
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleDelete = () => {
    if (!secretKey) {
      errorNotify("No secret key provided");
      return;
    }

    deletePost(postData.id, secretKey)
      .then((data) => {
        handleDeletePost(postData.id);
        infoNotify("Post has been deleted");
        navigate("/docs");
      })
      .catch((error) => {
        errorNotify(`${error?.message || "Failed to post"}`);
      });
  };

  function checkDataExist(postKey) {
    if (filteredData) {
      setPostData(filteredData);
    } else {
      setIsPending(true);
      const loadPost = /^\d+$/.test(postKey) ? getPostById : getPostBySlug;
      loadPost(postKey)
        .then((data) => {
          setPostData(data);
        })
        .catch((err) => console.error("Error occurred while loading post:", err))
        .finally(() => {
          setIsPending(false);
        });
    }
  }
  useEffect(() => {
    checkDataExist(postKey);
    window.scrollTo(0, 0);
  }, [postKey]);

  return (
    <div className="max-w-[1200px] mx-auto p-10 h-screen">
      <div className="w-full pb-5">
        <BackToPrev path={"/docs"} title={"Back"}></BackToPrev>
      </div>
      <div className="flex justify-center items-center">
        <If condition={isPending}>
          <Then>{() => <SearchLoader></SearchLoader>}</Then>
          <Else>
            <If condition={singlePostError}>
              <Then>
                <NoData></NoData>
              </Then>
            </If>
            <If condition={postData?.id}>
              <Then>
                <SinglePostCards
                  data={postData}
                  setSelectedItem={setSelectedItem}
                ></SinglePostCards>
              </Then>
            </If>
          </Else>
        </If>
        <CodeViewModal data={selectedItem}></CodeViewModal>
        <ConfirmationModal
          onChange={(e) => setSecertKey(e.target.value)}
          handleDelete={handleDelete}
        ></ConfirmationModal>
      </div>
      <If condition={isDeleteRequestLoading}>
        <Then>
          <RequestLoader></RequestLoader>
        </Then>
      </If>
    </div>
  );
};

export default PostDetails;
