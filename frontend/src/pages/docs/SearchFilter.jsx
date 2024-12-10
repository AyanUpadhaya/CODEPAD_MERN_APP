import { usePostContext } from "../../context/PostContext";
import Search from "../../components/shared/Search";
import SelectDropdown from "./SelectDropdown";
export default function SearchFilter({ className }) {
  const { setSearchValue } = usePostContext();
  return (
    <div className={`${className}`}>
      <div>
        <SelectDropdown />
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
