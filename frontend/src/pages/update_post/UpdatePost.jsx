import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import usePosts from "../../hooks/usePosts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fileDownloader from "../../utils/fileDownloader";
import ProceedWithUpdatePostModal from "../../components/modals/ProceedWithUpdatePostModal";
import RequestLoader from "../../components/shared/RequestLoader";
import SuccessModal from "../../components/modals/SuccessModal";
import { errorNotify } from "../../utils/getNotify";

const UpdatePost = () => {
  const [postData, setPostData] = useState({});
  const navigate = useNavigate();
  const { loading, error, updatePost, isPostUpdating, isPosRequestSuccess } =
    usePosts();
  const { state } = useLocation();
  const { payload, type } = state || {};

  const editorRef = useRef();
  const [language, setLanguage] = useState(payload?.language);
  const [value, setValue] = useState(payload?.code);
  const [resData, setResData] = useState(payload);
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({
    title: payload?.title || "",
    about: payload?.about || "",
    name: payload?.name || "",
    email: payload?.email || "",
    secret: "",
  });

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  function handleNavigate(path) {
    setShowModal(false);
    navigate(path);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const myData = {
      ...info,
      language: language,
      code: value,
    };
    try {
      await updatePost(payload.id, myData);
      setShowModal(true);
    } catch (error) {
      errorNotify(`${error?.message || "Failed to post"}`);
      console.log(error?.message);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div>
      <div className="overflow-hidden bg-[#26222a] p-4">
        <div className="max-w-[1200px] mx-auto h-full">
          <div className="flex justify-between py-5">
            {/* save button */}
            <div className="w-[130px]">
              <label
                htmlFor="infoPopUp"
                className="block cursor-pointer text-center border-none px-2 py-3 font-poppins text-white bg-[#367EE2] hover:bg-[#367EE2]  w-full h-auto text-sm rounded-md"
              >
                Update
              </label>
            </div>
          </div>
          <div>
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="100vh"
              theme="vs-dark"
              language={language}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
          </div>
        </div>
      </div>
      <ProceedWithUpdatePostModal
        info={info}
        setInfo={setInfo}
        handleSubmit={handleSubmit}
      ></ProceedWithUpdatePostModal>

      {isPostUpdating && <RequestLoader></RequestLoader>}
      <SuccessModal
        data={resData}
        msg="Post is updated"
        isSuccess={isPosRequestSuccess && showModal}
        handleNavigate={handleNavigate}
      ></SuccessModal>
    </div>
  );
};

export default UpdatePost;
