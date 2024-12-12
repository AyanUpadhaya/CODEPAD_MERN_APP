import formatTimestamp from "../../utils/formatTimestamp";

const PublicPostCard = ({ data, setSelectedItem, handleNavigate }) => {
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 min-h-full shadow-xl">
        <div className="card-body">
          <p className="text-left">{formatTimestamp(data?.timestamp)}</p>
          <p className="text-base break-words text-neutral-900 font-poppins text-left font-bold">
            {data?.title?.length > 50
              ? data?.title.slice(0, 50) + "..."
              : data?.title}
          </p>
          <p className="text-left break-words">
            {data?.about?.length > 100
              ? data?.about.slice(0, 100) + "..."
              : data?.about}
          </p>
          <p className="text-left font-bold">
            <br />
          </p>
          <p className="text-left font-bold break-words">
            {data?.name} <br /> {data?.email}
          </p>
          <div className="card-actions justify-between">
            <label
              htmlFor="codeViewPopUp"
              onClick={() => setSelectedItem(data)}
              className="hidden sm:block btn-view-code"
            >
              View Code
            </label>
            <button
              htmlFor="codeViewPopUp"
              onClick={() => handleNavigate("/view-mobile", data)}
              className="sm:hidden btn-view-code"
            >
              View Code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicPostCard;
