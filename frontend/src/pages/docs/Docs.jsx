import { useEffect, useState } from "react";
import { If, Then, Else } from "react-if";
import SearchLoader from "../../components/shared/SearchLoader";
import usePosts from "../../hooks/usePosts";
import NoData from "../../components/shared/NoData";
import { langdata } from "../../utils/langdata";
import DocPostCard from "../../components/cards/DocPostCard";
import Search from "../../components/shared/Search";

const Docs = () => {
  const { posts, loading, error, fetchPosts } = usePosts();
  const [language, setLanguage] = useState("javascript");
  const [isAscending, setIsAscending] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onSelect = (language) => {
    setLanguage(language);
  };

  //sort by timestamp
  const sortByTime = (a, b) => {
    if (isAscending) {
      return a.timestamp - b.timestamp;
    } else {
      return b.timestamp - a.timestamp;
    }
  };

  //and filter by coursename
  const filterSearchTitle = (data, searchValue) => {
    if (searchValue.trim().length > 0) {
      return data?.title?.toLowerCase().startsWith(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };
  const filterByLanguage = (data, language) => {
    if (language.trim().length > 0) {
      return data?.language?.toLowerCase() == language?.toLowerCase();
    } else {
      return true;
    }
  };

  let content = null;

  const newData = [...posts]
    ?.sort(sortByTime)
    ?.filter((item) => filterByLanguage(item, language))
    ?.filter((item) => filterSearchTitle(item, searchValue));

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div className="bg-base-200 min-h-screen py-3 px-4 ">
      {/* buttons */}
      <div className="max-w-[1200px] mx-auto h-full flex flex-col justify-between items-center">
        <div className="w-full flex justify-between flex-wrap gap-4 py-5">
          <div>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
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
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#3b373f] text-white rounded-md z-[1] w-52 max-h-80 overflow-y-scroll p-2 shadow"
              >
                {langdata?.map((item, idx) => (
                  <li
                    onClick={() => onSelect(item)}
                    className="cursor-pointer"
                    key={idx}
                  >
                    <a>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Search
              divClass="w-full bg-white text-neutral-900"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            ></Search>
          </div>
        </div>
      </div>
      {/* grid */}
      <div className="max-w-[1200px] mx-auto py-2">
        <If condition={loading}>
          <Then>{() => <SearchLoader></SearchLoader>}</Then>
          <Else>
            <If condition={newData.length == 0 || error}>
              <Then>
                <NoData></NoData>
              </Then>
              <Else>
                <div className="grid md:grid-cols-3 gap-3">
                  {newData?.map((item, index) => (
                    <DocPostCard key={item?.id} data={item}></DocPostCard>
                  ))}
                </div>
              </Else>
            </If>
          </Else>
        </If>
      </div>
    </div>
  );
};

export default Docs;
