import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useLocation, useNavigate } from "react-router-dom";
import { errorNotify } from "../../utils/getNotify";
import { usePostContext } from "../../context/PostContext";
import { validateEmail } from "../../utils/helpers";
import usePosts from "../../hooks/usePosts";
import ProceedWithUpdatePostModal from "../../components/modals/ProceedWithUpdatePostModal";
import RequestLoader from "../../components/shared/RequestLoader";
import SuccessModal from "../../components/modals/SuccessModal";
import BackToPrev from "../../components/shared/BackToPrev";

const UpdatePost = () => {
  const navigate = useNavigate();
  const { handlePostUpadate, invalidateCache } = usePostContext();
  const { updatePost, isPostUpdating, isPosRequestSuccess } = usePosts();
  const { state } = useLocation();
  const { payload, previousPath } = state || {};

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
  console.log(info)

  //change state and handle character limit
  const handleChange = (event, maxLength = 1000) => {
    const target = event.target;

    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength); // Trim the excess characters
    }
    const { name, value } = target;

    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value, // Dynamically update the field based on its `name`
    }));
  };

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
    if (!validateEmail(myData.email)) {
      errorNotify("Email isn't valid");
      return;
    }
    try {
      await updatePost(payload.id, myData);
      handlePostUpadate(payload.id, myData);
      invalidateCache();
      setShowModal(true);
    } catch (error) {
      errorNotify(`${error?.message || "Failed to post"}`);
    }
  }
  // Scroll to the top-left corner of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="overflow-hidden bg-[#26222a] p-4">
        <div className="max-w-[1200px] mx-auto h-full">
          <div className="flex gap-2 flex-wrap justify-between py-5">
            <div>
              <BackToPrev
                fontColor="text-white"
                title={"Back"}
                svgColor={"#ffffff"}
                path={previousPath}
              ></BackToPrev>
            </div>
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
        handleChange={handleChange}
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
