import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { CODE_SNIPPETS } from "../../constants/constants";
import getExtension from "../../utils/getExtension";

const CodeViewModal = ({ modalClose, data, handleDownload }) => {
  const editorRef = useRef();
  const [value, setValue] = useState(data?.code || "");
  const [language, setLanguage] = useState("javascript");


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
            <div className="flex justify-between">
              <div>
                <h2 className="font-monts text-lg font-bold text-white">
                  {data?.title}
                </h2>
                <p className=" font-monts text-sm text-white">{data?.about}</p>
              </div>
              <div className="flex gap-4">
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
