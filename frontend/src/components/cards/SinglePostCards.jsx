import { useNavigate } from "react-router-dom";
import formatTimestamp from "../../utils/formatTimestamp";

const SinglePostCards = ({ data, setSelectedItem }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card card-compact bg-base-100 w-[500px] h-auto shadow-xl">
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
          <div className="card-actions py-10">
            <label
              htmlFor="codeViewPopUp"
              onClick={() => setSelectedItem(data)}
              className="cursor-pointer p-1 font-poppins text-center text-white hover:text-neutral-800 bg-neutral-800 w-[110px] h-auto border-none hover:bg-tertiary-500 text-sm rounded-badge"
            >
              View Code
            </label>
            <button
              onClick={() =>
                navigate(`/update_post`, {
                  state: {
                    payload: data,
                    type: "edit",
                  },
                })
              }
              className="cursor-pointer p-1 font-poppins text-center text-white hover:text-neutral-800 bg-slate-800 w-[110px] h-auto border-none hover:bg-tertiary-500 text-sm rounded-badge"
            >
              Edit
            </button>
            <label
              htmlFor="ConfirmationModal"
              className="cursor-pointer p-1 font-poppins text-center text-white hover:text-neutral-800 bg-red-500 w-[110px] h-auto border-none hover:bg-tertiary-500 text-sm rounded-badge"
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostCards;
