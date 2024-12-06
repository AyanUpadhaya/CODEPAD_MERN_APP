import formatTimestamp from "../../utils/formatTimestamp";

const PublicPostCard = ({ data, setSelectedItem }) => {
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 min-h-full shadow-xl">
        <div className="card-body">
          <p className="text-left">{formatTimestamp(data?.timestamp)}</p>
          <p className="text-base text-neutral-900 font-poppins text-left font-bold">
            {data?.title?.length > 100
              ? data?.title.slice(0, 100) + "..."
              : data?.title}
          </p>
          <p className="text-left">
            {data?.about?.length > 100
              ? data?.about.slice(0, 100) + "..."
              : data?.about}
          </p>
          <p className="text-left font-bold">
            <br />
          </p>
          <p className="text-left font-bold">
            {data?.name} <br /> {data?.email}
          </p>
          <div className="card-actions justify-between">
            <label
              htmlFor="codeViewPopUp"
              onClick={() => setSelectedItem(data)}
              className="text-center cursor-pointer p-1 font-poppins text-white hover:text-neutral-800 bg-neutral-800 w-[110px] h-auto border-none hover:bg-tertiary-500 text-sm rounded-badge"
            >
              View Code
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicPostCard;
