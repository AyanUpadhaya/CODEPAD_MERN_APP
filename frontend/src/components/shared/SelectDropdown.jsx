import React, { useState } from "react";


function SelectDropdown({ language, langdata, onSelect }) {
  
  const [showMenu, setShowMenu] = useState(true);
  return (
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
  );
}

export default SelectDropdown;
