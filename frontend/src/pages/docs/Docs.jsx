import { useEffect } from "react";
import { usePostContext } from "../../context/PostContextProvider";
import { useFilters } from "../../hooks/useFilters";
import DataGrid from "./DataGrid";
import SearchFilter from "./SearchFilter";

const Docs = () => {
  const { posts, loading, error, language, searchValue, sortByTime } =
    usePostContext();

  const { filterSearchTitle, filterByLanguage } = useFilters();

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
        <SearchFilter className="w-full flex justify-between flex-wrap gap-4 py-5"></SearchFilter>
      </div>
      {/* grid */}
      {newData && (
        <DataGrid
          data={newData}
          loading={loading}
          error={error}
          className="max-w-[1200px] mx-auto py-2"
        ></DataGrid>
      )}
    </div>
  );
};

export default Docs;
