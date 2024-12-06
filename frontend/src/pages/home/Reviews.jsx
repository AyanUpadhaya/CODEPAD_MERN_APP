import ReviewCard from "../../components/cards/ReviewCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Reviews = () => {
  const data = [
    {
      review:
        "CodePad's containers with pre-built tech stacks are a giant step in the right direction! It helps remove a lot of the dreaded setup and environmental configuration developers need to do, which is always welcome.",
      author: "Adrienne Tacke",
      position: "Developer Advocate at MongoDB",
    },
    {
      review:
        "The ability to have a VS Code like editor on any of my devices, and on top of that not need to configure my environments is a win-win for me.",
      author: "Jesper Noehr",
      position: "Founder at BitBucket",
    },
    {
      review:
        "I love it. It's especially great for my open source projects, no need to install anything on my local machine. Just paste my GitHub URL and codepad takes care of the rest.",
      author: "Marko Bozic",
      position: "Director of Engineering at Noom",
    },
    {
      review:
        "The ability to have a VS Code like editor on any of my devices, and on top of that not need to configure my environments is a win-win for me.",
      author: "Jesper Noehr",
      position: "Founder at BitBucket",
    },
    {
      review:
        "I love it. It's especially great for my open source projects, no need to install anything on my local machine. Just paste my GitHub URL and codepad takes care of the rest.",
      author: "Marko Bozic",
      position: "Director of Engineering at Noom",
    },
    {
      review:
        "The ability to have a VS Code like editor on any of my devices, and on top of that not need to configure my environments is a win-win for me.",
      author: "Jesper Noehr",
      position: "Founder at BitBucket",
    },
    {
      review:
        "I love it. It's especially great for my open source projects, no need to install anything on my local machine. Just paste my GitHub URL and codepad takes care of the rest.",
      author: "Marko Bozic",
      position: "Director of Engineering at Noom",
    },
    {
      review:
        "The ability to have a VS Code like editor on any of my devices, and on top of that not need to configure my environments is a win-win for me.",
      author: "Jesper Noehr",
      position: "Founder at BitBucket",
    },
    {
      review:
        "I love it. It's especially great for my open source projects, no need to install anything on my local machine. Just paste my GitHub URL and codepad takes care of the rest.",
      author: "Marko Bozic",
      position: "Director of Engineering at Noom",
    },
  ];
  return (
    <div className="bg-gradient-to-b from-white to-tertiary-50 py-10 ">
      <div className="max-w-[1200px] mx-auto h-full flex flex-col justify-between items-center">
        <div className="py-5 flex flex-col gap-2 md:gap-5 ">
          <h2 className="text-neutral-950 font-poppins font-normal text-2xl sm:text-4xl md:text-6xl text-center">
            Reviews
          </h2>
          <p className="text-neutral-950 font-poppins font-normal text-base sm:text-lg md:text-2xl text-center">
            What peoples saying
          </p>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto py-2 md:py-10">
        <Swiper
          slidesPerView={3}
          spaceBetween={24}
          grabCursor={true}
          loop={true}
          breakpoints={{
            // when window width is >= 640px
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            }
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <>
            {data?.map((item, index) => (
              <SwiperSlide key={index}>
                <ReviewCard data={item}></ReviewCard>
              </SwiperSlide>
            ))}
          </>
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
