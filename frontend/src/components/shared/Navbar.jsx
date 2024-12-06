import { Link, useNavigate } from "react-router-dom";
import { code } from "../../assets/getAssets";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
   const handleNavigateToSection = (sectionId) => {
     // Navigate to home and then append the hash
     navigate("/");
     setTimeout(() => {
       const element = document.getElementById(sectionId);
       if (element) {
         element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
       }
     }, 100); // Slight delay to ensure the page loads first
   };

  return (
    <div className="w-full bg-white border-tertiary-50 py-3 sticky top-0 left-0 text-neutral-900 shadow-md z-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center justify-between">
            <Link to={"/"} className="flex gap-1 items-center">
              <img src={code} className="w-8 h-8" alt="" />
              <h2 className="font-poppins text-xl font-semibold">CodePad</h2>
            </Link>

            <button
              className="md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M5.33333 24H26.6667C27.4 24 28 23.4 28 22.6667C28 21.9333 27.4 21.3333 26.6667 21.3333H5.33333C4.6 21.3333 4 21.9333 4 22.6667C4 23.4 4.6 24 5.33333 24ZM5.33333 17.3333H26.6667C27.4 17.3333 28 16.7333 28 16C28 15.2667 27.4 14.6667 26.6667 14.6667H5.33333C4.6 14.6667 4 15.2667 4 16C4 16.7333 4.6 17.3333 5.33333 17.3333ZM4 9.33333C4 10.0667 4.6 10.6667 5.33333 10.6667H26.6667C27.4 10.6667 28 10.0667 28 9.33333C28 8.6 27.4 8 26.6667 8H5.33333C4.6 8 4 8.6 4 9.33333Z"
                  fill="#404040"
                />
              </svg>
            </button>
          </div>

          <div
            className={`${
              !showMenu ? "h-0 duration-300" : "h-[200px] duration-300"
            } overflow-hidden md:h-fit md:flex md:flex-row gap-2 items-center px-1 md:px-0`}
          >
            <div>
              <ul className="flex flex-col md:flex-row gap-3 p-5 md:p-0">
                <li className="font-poppins text-base hover:text-neutral-950">
                  <button onClick={() => handleNavigateToSection("features")}>
                    Features
                  </button>{" "}
                  {/* Programmatic navigation for Features */}
                </li>
                <li className="font-poppins text-base hover:text-neutral-950">
                  <button onClick={() => handleNavigateToSection("trending")}>
                    Public Posts
                  </button>{" "}
                  {/* Programmatic navigation for Public Posts */}
                </li>
                <li className="font-poppins text-base hover:text-neutral-950">
                  <Link to="/docs">Docs</Link> {/* Use Link for Docs */}
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate("/add_post")}
              className="border-none px-2 py-2 font-poppins text-white bg-[#367EE2] hover:bg-[#367EE2]  min-w-[130px] h-auto text-sm rounded-md"
            >
              + Add Public Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
