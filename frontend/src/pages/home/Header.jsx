import { editor } from "../../assets/getAssets";

const Header = ({ navigate }) => {
  return (
    <div className="sm:h-screen overflow-hidden bg-gradient-to-b from-[#220432e4] to-[#220432] px-4 py-10 sm:py-0 ">
      <div className="max-w-[1200px] mx-auto h-full flex flex-col justify-between items-center">
        <div className="py-5 flex flex-col gap-5 text-center">
          <h2 className="text-white font-poppins font-bold text-5xl">
            CodePad Editor
          </h2>
          <p className="text-white font-poppins font-bold">
            Build and share your code
          </p>
          <p>
            <button
              onClick={() => navigate("/add_post")}
              className="btn-get-started"
            >
              Get Started
            </button>
          </p>
        </div>
        <div className="hidden sm:block flex-1 -mb-[20vh] w-full relative border-5 border-gray-500 rounded-md p-4">
          <img
            src={editor}
            className="absolute inset-0 mx-auto h-full object-cover object-left-top"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
