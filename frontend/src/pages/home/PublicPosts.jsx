import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import PublicPostCard from "../../components/cards/PublicPostCard";
import {CodeViewModal} from "../../components/modals";
import { useState } from "react";
import { If, Then, Else } from "react-if";
import NoData from "../../components/shared/NoData";
import SearchLoader from "../../components/shared/SearchLoader";
import { usePostContext } from "../../context/PostContextProvider";
import { useLocation, useNavigate } from "react-router-dom";


const PublicPosts = ({ navigate }) => {
  const { posts, loading, error } = usePostContext();

  const [selectedItem, setSelectedItem] = useState({});

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

  const location = useLocation();

  const handleNavigate = (path, data) => {
    navigate(`${path}`, {
      state: {
        payload: data,
        type: "view",
        previousPath: location.pathname,
      },
    });
  };

  //we check first if loading then we check for empty posts or error
  const renderData = (
    <If condition={loading}>
      <Then>{() => <SearchLoader></SearchLoader>}</Then>
      <Else>
        <If condition={posts.length == 0 || error}>
          <Then>
            <NoData></NoData>
          </Then>
          <Else>
            {() => (
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
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                <>
                  {posts?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <PublicPostCard
                        setSelectedItem={setSelectedItem}
                        data={item}
                        handleNavigate={handleNavigate}
                      ></PublicPostCard>
                    </SwiperSlide>
                  ))}
                </>
              </Swiper>
            )}
          </Else>
        </If>
      </Else>
    </If>
  );

  return (
    <div id="trending" className="bg-base-200 sm:py-10 px-4">
      <div className="max-w-[1200px] mx-auto h-full flex flex-col justify-between items-center">
        <div className="py-5 flex flex-col gap-2 md:gap-5 ">
          <h2 className="text-neutral-950 font-poppins font-normal text-2xl sm:text-4xl md:text-6xl text-center">
            Public Posts
          </h2>
          <p className="text-neutral-950 font-poppins font-normal text-base sm:text-lg md:text-2xl text-center">
            See what people are posting
          </p>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto py-2 md:py-10">{renderData}</div>
      <CodeViewModal
        handleDownload={handleDownload}
        data={selectedItem}
      ></CodeViewModal>
    </div>
  );
};

export default PublicPosts;
