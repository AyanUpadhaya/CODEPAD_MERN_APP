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
const PostDetails = () => {
  const params = useParams();
  const { loading, error, getPostById, deletePost, isDeleteRequestLoading } =
    usePosts();
  const [postData, setPostData] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [secretKey, setSecertKey] = useState("");
  const navigate = useNavigate();

  const handleDownload = (data, filename, filetype) => {
    // Create a Blob object
    const blob = new Blob([data], { type: filetype });

    // Create an anchor element and set attributes for download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Append to the document body, trigger click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {
    if (!secretKey) {
      errorNotify("No secret key provided");
      return;
    }
    deletePost(params.id, secretKey)
      .then(() => {
        infoNotify("Post has been deleted");
        navigate("/docs");
      })
      .catch((error) => {
        console.log(`${error.message} || "Failed to delete post`);
      });
  };

  useEffect(() => {
    getPostById(params.id)
      .then((data) => setPostData(data))
      .catch((err) => console.log("Error occured:", error));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto p-10 h-screen">
      <div className="w-full pb-5">
        <BackToPrev path={"/docs"} title={"Back"}></BackToPrev>
      </div>
      <div className="flex justify-center items-center">
        <If condition={loading}>
          <Then>{() => <SearchLoader></SearchLoader>}</Then>
          <Else>
            <If condition={error}>
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
        <CodeViewModal
          handleDownload={handleDownload}
          data={selectedItem}
        ></CodeViewModal>
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
