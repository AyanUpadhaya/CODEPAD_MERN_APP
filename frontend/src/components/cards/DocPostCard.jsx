import { useNavigate } from "react-router-dom";
import formatTimestamp from "../../utils/formatTimestamp";

const DocPostCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card card-compact bg-base-100 w-full min-h-full shadow-xl">
        <div className="card-body">
          <p className="text-left">{formatTimestamp(data?.timestamp)}</p>
          <p className="text-base text-neutral-900 font-poppins text-left font-bold">
            {data?.title?.length > 30
              ? data?.title.slice(0, 30) + "..."
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
              onClick={() => navigate(`/details/${data?.id}`)}
              className="text-center cursor-pointer p-1 font-poppins text-white hover:text-neutral-800 bg-neutral-800 w-[110px] h-auto border-none hover:bg-tertiary-500 text-sm rounded-badge"
            >
              View Post
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocPostCard;
