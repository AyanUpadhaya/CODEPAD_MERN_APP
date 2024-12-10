import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { CODE_SNIPPETS } from "../../constants/constants";
import getExtension from "../../utils/getExtension";

const CodeViewModal = ({ modalClose={}, data}) => {
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
        <div className="modal-box w-11/12 max-w-full h-screen bg-[#26222a]  rounded">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row justify-between flex-wrap gap-4">
              <div className="max-w-full md:before:max-w-[85%] break-words">
                <h2 className="font-monts text-lg font-bold text-white break-words">
                  {data?.title}
                </h2>
               
              </div>
              <div className="flex flex-wrap gap-4">
                <label
                  htmlFor="codeViewPopUp"
                  className="text-center cursor-pointer flex flex-col justify-center items-center  px-2 py-2 font-poppins text-white bg-red-500 hover:bg-red-500  min-w-[130px]  text-sm rounded-md"
                >
                  Close
                </label>
                <button
                  onClick={() =>
                    handleDownload(
                      data?.code,
                      `${data?.title}.${getExtension(data?.language)}`,
                      `application/${data?.language}`
                    )
                  }
                  className="border-none px-2 py-2 font-poppins text-white bg-[#367EE2] hover:bg-[#367EE2]  min-w-[130px] h-auto text-sm rounded-md"
                >
                  Download
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
