import { useNavigate } from "react-router-dom";
import formatTimestamp from "../../utils/formatTimestamp";

const DocPostCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card card-compact bg-base-100 w-full min-h-full shadow-xl">
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
              onClick={() => navigate(`/details/${data?.id}`)}
              className="btn-view-code"
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
