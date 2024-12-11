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
  const { handlePostUpadate, invalidateCache, isPosRequestLoading } =
    usePostContext();
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
      <div className="h-screen overflow-hidden bg-[#26222a] px-4">
        <div className="max-w-[1200px] mx-auto h-full">
          <div className="flex gap-2 flex-wrap items-center justify-between py-5">
            <div className="flex flex-col items-center justify-center">
              <BackToPrev
                fontColor="text-white"
                title={"Back"}
                svgColor={"#ffffff"}
                path={previousPath}
                className="mt-2"
              ></BackToPrev>
            </div>
            {/* save button */}
            <div className="max-w-max">
              <label
                htmlFor="infoPopUp"
                className="block cursor-pointer text-center border-none px-2 py-3 font-poppins text-white bg-[#367EE2] hover:bg-[#367EE2]  w-full h-auto text-sm rounded-md"
              >
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="System / Save">
                    <path
                      id="Vector"
                      d="M17 21.0002L7 21M17 21.0002L17.8031 21C18.921 21 19.48 21 19.9074 20.7822C20.2837 20.5905 20.5905 20.2843 20.7822 19.908C21 19.4806 21 18.921 21 17.8031V9.21955C21 8.77072 21 8.54521 20.9521 8.33105C20.9095 8.14 20.8393 7.95652 20.7432 7.78595C20.6366 7.59674 20.487 7.43055 20.1929 7.10378L17.4377 4.04241C17.0969 3.66374 16.9242 3.47181 16.7168 3.33398C16.5303 3.21 16.3242 3.11858 16.1073 3.06287C15.8625 3 15.5998 3 15.075 3H6.2002C5.08009 3 4.51962 3 4.0918 3.21799C3.71547 3.40973 3.40973 3.71547 3.21799 4.0918C3 4.51962 3 5.08009 3 6.2002V17.8002C3 18.9203 3 19.4796 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H7M17 21.0002V17.1969C17 16.079 17 15.5192 16.7822 15.0918C16.5905 14.7155 16.2837 14.4097 15.9074 14.218C15.4796 14 14.9203 14 13.8002 14H10.2002C9.08009 14 8.51962 14 8.0918 14.218C7.71547 14.4097 7.40973 14.7155 7.21799 15.0918C7 15.5196 7 16.0801 7 17.2002V21M15 7H9"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
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
        isSuccess={isPosRequestSuccess && showModal && !isPosRequestLoading}
        handleNavigate={handleNavigate}
      ></SuccessModal>
    </div>
  );
};

export default UpdatePost;
