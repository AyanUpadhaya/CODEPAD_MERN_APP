import { useNavigate, useParams } from "react-router-dom";
import NoData from "../../components/shared/NoData";
import usePosts from "../../hooks/usePosts";
import { If, Then, Else } from "react-if";
import { useEffect, useState } from "react";
import SinglePostCards from "../../components/cards/SinglePostCards";
import SearchLoader from "../../components/shared/SearchLoader";
import CodeViewModal from "../../components/modals/CodeViewModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { errorNotify, infoNotify } from "../../utils/getNotify";
import RequestLoader from "../../components/shared/RequestLoader";
import BackToPrev from "../../components/shared/BackToPrev";
import useGetCachedPost from "./useGetCachedPost";
import { usePostContext } from "../../context/PostContext";

const PostDetails = () => {
  const params = useParams();

  const filteredData = useGetCachedPost(params?.id);
  const {
    singlePostError,
    getPostById,
    deletePost,
    isDeleteRequestLoading,
    setCachedPost,
    invalidateCache,
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

    deletePost(params.id, secretKey)
      .then((data) => {
        handleDeletePost(params.id);
        invalidateCache();
        infoNotify("Post has been deleted");
        navigate("/docs");
      })
      .catch((error) => {
        errorNotify(`${error?.message || "Failed to post"}`);
      });
  };

  function checkDataExist(id) {
    if (filteredData) {
      setPostData(filteredData);
    } else {
      setIsPending(true);
      getPostById(id)
        .then((data) => {
          setPostData(data);
          if (data.id) {
            setCachedPost((prev) => {
              if (prev.find((item) => item.id === data.id)) {
                return prev; // If already exists, return as is
              }
              return [...prev, data];
            });
          }
        })
        .catch((err) => console.log("Error occured:", error))
        .finally(() => {
          setIsPending(false);
        });
    }
  }
  useEffect(() => {
    checkDataExist(params.id);
    window.scrollTo(0, 0);
  }, []);

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

      {isDeleteRequestLoading && <RequestLoader></RequestLoader>}
    </div>
  );
};

export default PostDetails;
