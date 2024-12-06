import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { CODE_SNIPPETS } from "../../constants/constants";
import ProceedWithCreatePostModal from "../../components/modals/ProceedWithCreatePostModal";
import RequestLoader from "../../components/shared/RequestLoader";
import SuccessModal from "../../components/modals/SuccessModal";
import usePosts from "../../hooks/usePosts";
import { errorNotify } from "../../utils/getNotify";
import fileDownloader from "../../utils/fileDownloader";
import { replace, useNavigate } from "react-router-dom";
const AddPost = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(CODE_SNIPPETS[language]);
  const [resData, setResData] = useState({} || "");
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({
    title: "",
    about: "",
    name: "",
    email: "",
  });

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const langdata = [
    "javascript",
    "python",
    "html",
    "php",
    "java",
    "c",
    "c++",
    "c#",
    "ruby",
    "go",
    "kotlin",
    "swift",
    "typescript",
    "css",
    "shell",
    "sql",
    "r",
    "perl",
    "dart",
    "rust",
    "scala",
    "xml",
    "json",
    "yaml",
    "markdown",
    "txt",
  ];

  const { createPost, isPosRequestLoading, error, isPosRequestSuccess } =
    usePosts();

  const navigate = useNavigate()
  

  //functions

  function handleNavigate(path){
    setShowModal(false);
    navigate(path)
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
    createPost(myData)
      .then((data) => {
        setResData(data);
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
      })
      .catch((error) => {
        errorNotify(`${error?.message || "Failed to post"}`);
      });
  }

  return (
    <div>
      <div className="overflow-hidden bg-[#26222a] p-4">
        <div className="max-w-[1200px] mx-auto h-full">
          <div className="flex justify-between py-5">
            <div>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
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
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-[#3b373f] text-white rounded-md z-[1] w-52 max-h-80 overflow-y-scroll p-2 shadow"
                >
                  {langdata?.map((item, idx) => (
                    <li
                      onClick={() => onSelect(item)}
                      className="cursor-pointer"
                      key={idx}
                    >
                      <a>{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-[130px]">
              <label
                htmlFor="infoPopUp"
                className="block cursor-pointer text-center border-none px-2 py-3 font-poppins text-white bg-[#367EE2] hover:bg-[#367EE2]  w-full h-auto text-sm rounded-md"
              >
                Save
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
        setInfo={setInfo}
        handleSubmit={handleSubmit}
      ></ProceedWithCreatePostModal>
      {isPosRequestLoading && <RequestLoader></RequestLoader>}
      <SuccessModal
        data={resData}
        msg="Please copy the secret key"
        isSuccess={isPosRequestSuccess && showModal}
        handleNavigate={handleNavigate}
      ></SuccessModal>
    </div>
  );
};

export default AddPost;
