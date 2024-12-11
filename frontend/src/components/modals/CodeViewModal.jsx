import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { CODE_SNIPPETS } from "../../constants/constants";
import getExtension from "../../utils/getExtension";
import { fileDownloader } from "../../utils/helpers";

const CodeViewModal = ({ modalClose = {}, data }) => {
  const editorRef = useRef();
  const [value, setValue] = useState(data?.code || "");
  const [language, setLanguage] = useState("javascript");

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

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  useEffect(() => {
    setValue(data?.code);
    setLanguage(data?.language);
  }, [data?.code]);

  return (
    <>
      <input type="checkbox" id="codeViewPopUp" className="modal-toggle" />
      <div className="modal px-6" role="dialog">
        <div className="modal-box w-11/12 max-w-full py-2 h-screen bg-[#26222a]  rounded">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="max-w-full md:before:max-w-[85%] break-words">
                <h2 className="font-monts text-lg font-bold text-white break-words">
                  {data?.title}
                </h2>
              </div>
              <div className="flex flex-row-reverse flex-wrap gap-4">
                {/* close */}
                <label
                  htmlFor="codeViewPopUp"
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
                </label>
                {/* download */}
                <button
                  onClick={() =>
                    fileDownloader(
                      data?.code,
                      `${data?.title}.${getExtension(data?.language)}`,
                      `application/${data?.language}`
                    )
                  }
                  className="flex justify-center max-w-max border-none px-2 py-2 font-poppins text-white bg-[#367EE2] hover:bg-[#367EE2]   h-auto text-sm rounded-md"
                >
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                height="75vh"
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
        <label
          className="modal-backdrop cursor-pointer"
          htmlFor="codeViewPopUp"
        >
          Close
        </label>
      </div>
    </>
  );
};

export default CodeViewModal;
