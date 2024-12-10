import { screenshot } from "../../assets/getAssets";

const Features = () => {
  return (
    <div
      id="features"
      className="bg-gradient-to-b from-white to-tertiary-50 sm:py-10 px-4 "
    >
      <div className="max-w-[1200px] mx-auto h-full flex flex-col justify-between items-center">
        <div className="py-5 flex flex-col gap-2 md:gap-5 ">
          <h2 className="text-neutral-950 font-poppins font-normal text-2xl sm:text-4xl md:text-6xl text-center">
            Features
          </h2>
          <p className="text-neutral-950 font-poppins font-normal text-base sm:text-lg md:text-2xl text-center">
            Your code editor of choice
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 relative px-4">
            <div className="flex flex-col gap-10 md:max-w-[450px]">
              <h2 className="font-poppins from-neutral-colors-900 text-base sm:text-2xl md:text-3xl">
                Supports a wide range of programming languages including
                JavaScript, Python, PHP, Ruby, Java, and many more.
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae vitae fugit sit possimus. Ut doloribus ea sequi
                temporibus beatae aliquam unde vero sunt vitae illum reiciendis
                itaque tenetur, dolorem eos.
              </p>
            </div>
            <div className="flex-1 bg-gray-500 rounded-md p-4">
              <img src={screenshot} className="w-full h-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
