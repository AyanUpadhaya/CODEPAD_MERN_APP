import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { CODE_SNIPPETS } from "../../constants/constants";
import ProceedWithCreatePostModal from "../../components/modals/ProceedWithCreatePostModal";
import RequestLoader from "../../components/shared/RequestLoader";
import SuccessModal from "../../components/modals/SuccessModal";
import usePosts from "../../hooks/usePosts";
import { errorNotify } from "../../utils/getNotify";

import { replace, useNavigate } from "react-router-dom";
import { langdata } from "../../utils/langdata";
import { usePostContext } from "../../context/PostContext";
import { fileDownloader, validateEmail } from "../../utils/helpers";
import { limitCharacters } from "../../utils/helpers";

const AddPost = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(CODE_SNIPPETS[language]);
  const [resData, setResData] = useState({} || "");
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [info, setInfo] = useState({
    title: "",
    about: "",
    name: "",
    email: "",
  });

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

  const { handleNewPost, invalidateCache } = usePostContext();

  const { createPost, isPosRequestLoading, error, isPosRequestSuccess } =
    usePosts();

  //functions
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  const navigate = useNavigate();

  function handleNavigate(path) {
    setShowModal(false);
    navigate(path);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const myData = {
      title: info.title,
      about: info.about,
      name: info.name,
      email: info.email,
      language: language,
      code: value,
    };
    if (!validateEmail(myData.email)) {
      errorNotify("Email isn't valid");
      return;
    }
    createPost(myData)
      .then((data) => {
        //to server response data in modal
        setResData(data);
        //automatic file download json data
        fileDownloader(
          data,
          `${data?.title + ".txt" || "Sample.txt"}`,
          `application/text`
        );
        setInfo({
          title: "",
          about: "",
          name: "",
          email: "",
        });
        setShowModal(true);
        invalidateCache();
        //to update contenxt
        handleNewPost(data);
      })
      .catch((error) => {
        errorNotify(`${error.message || "Something went wrong "} `);
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div>
      <div className="h-screen overflow-hidden bg-[#26222a] px-4">
        <div className="max-w-[1200px] mx-auto h-full">
          <div className="flex gap-2 flex-wrap justify-between items-center py-5">
            <div>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => setShowMenu(true)}
                  className="flex gap-2 justify-around border-none px-2 py-2 font-poppins text-white bg-[#58515e] border  min-w-[130px] h-auto text-sm rounded-md text-center "
                >
                  <span className="capitalize">{language}</span>

                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="rotate-90"
                    >
                      <path
                        d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                </div>
                {showMenu && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-[#3b373f] text-white rounded-md z-[1] w-52 max-h-80 overflow-y-scroll p-2 shadow"
                  >
                    {langdata?.map((item, idx) => (
                      <li
                        onClick={() => {
                          onSelect(item);
                          setShowMenu(false);
                        }}
                        className="cursor-pointer"
                        key={idx}
                      >
                        <a>{item}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex gap-2">
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
              <button
                onClick={() => navigate("/")}
                className="text-center cursor-pointer flex flex-col justify-center items-center  px-2 py-2 font-poppins text-white bg-red-500 hover:bg-red-500  max-w-max  text-sm rounded-md"
              >
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                    fill="#fff"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                    fill="#fff"
                  />
                </svg>
              </button>
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
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
          </div>
        </div>
      </div>
      <ProceedWithCreatePostModal
        info={info}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isPosRequestLoading={isPosRequestLoading}
      ></ProceedWithCreatePostModal>

      {isPosRequestLoading && <RequestLoader></RequestLoader>}
      <SuccessModal
        data={resData}
        msg="Please copy the secret key"
        isSuccess={isPosRequestSuccess && showModal && !isPosRequestLoading}
        handleNavigate={handleNavigate}
      ></SuccessModal>
    </div>
  );
};

export default AddPost;
