import { Link } from "react-router-dom";
import { code } from "../../assets/getAssets";

function Navbar() {
  return (
    <div className="w-full bg-white border-tertiary-50 py-3 sticky top-0 left-0 text-neutral-900 shadow-md z-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link to={"/"} className="flex gap-1 items-center">
              <img src={code} className="w-8 h-8" alt="" />
              <h2 className="font-poppins text-xl font-semibold">CodePad</h2>
            </Link>
          </div>

          <div className="flex gap-2 items-center">
            <div>
              <ul className="flex gap-3">
                <li className="font-poppins text-base hover:text-neutral-950">
                  <a href="#">Features</a>
                </li>
                <li className="font-poppins text-base hover:text-neutral-950">
                  <a href="#">Public Posts</a>
                </li>
                <li className="font-poppins text-base hover:text-neutral-950">
                  <a href="">Docs</a>
                </li>
              </ul>
            </div>
            {/* <button className="px-2 py-2 font-poppins text-white bg-buttonPrimary w-[110px] text-sm rounded">
              Login
            </button> */}
            <button className="border-none px-2 py-2 font-poppins text-white bg-[#367EE2] hover:bg-[#367EE2]  min-w-[130px] h-auto text-sm rounded-md">
              + Add Public Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
