import { editor } from "../../assets/getAssets";

const Header = () => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-[#220432e4] to-[#220432] ">
      <div className="max-w-[1200px] mx-auto h-full flex flex-col justify-between items-center">
        <div className="py-5 flex flex-col gap-5 text-center">
          <h2 className="text-white font-poppins font-bold text-5xl">
            CodePad Editor
          </h2>
          <p className="text-white font-poppins font-bold">
            Build and share your code
          </p>
          <p>
            <button className="btn px-2 py-2 font-poppins text-white hover:text-neutral-800 bg-neutral-800 w-[110px] h-auto border-none hover:bg-tertiary-500 text-sm rounded-md">
              Get Started
            </button>
          </p>
        </div>
        <div className="flex-1 -mb-[20vh] w-full relative border-5 border-gray-500 rounded-md p-4">
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
