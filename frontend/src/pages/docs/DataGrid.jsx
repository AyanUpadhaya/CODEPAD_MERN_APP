import { If, Then, Else } from "react-if";
import SearchLoader from "../../components/shared/SearchLoader";
import DocPostCard from "../../components/cards/DocPostCard";
import NoData from "../../components/shared/NoData";
export default function DataGrid({
  data = [],
  loading = "false",
  error = "false",
  className = "",
}) {
  return (
    <div className={`${className}`}>
      <If condition={loading}>
        <Then>{() => <SearchLoader></SearchLoader>}</Then>
        <Else>
          <If condition={data.length == 0 || error}>
            <Then>
              <NoData></NoData>
            </Then>
            <Else>
              <div className="grid md:grid-cols-3 gap-3">
                {data?.map((item, index) => (
                  <DocPostCard key={item?.id} data={item}></DocPostCard>
                ))}
              </div>
            </Else>
          </If>
        </Else>
      </If>
    </div>
  );
}
