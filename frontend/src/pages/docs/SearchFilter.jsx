import { usePostContext } from "../../context/PostContextProvider";
import Search from "../../components/shared/Search";
import SelectDropdown from "../../components/shared/SelectDropdown";

export default function SearchFilter({ className }) {
  const { setSearchValue, language, langdata, onSelect } = usePostContext();
  return (
    <div className={`${className}`}>
      <div>
        <SelectDropdown
          language={language}
          langdata={langdata}
          onSelect={onSelect}
        />
      </div>
      <div className="w-full md:w-1/2">
        <Search
          divClass="w-full bg-white text-neutral-900"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        ></Search>
      </div>
    </div>
  );
}
