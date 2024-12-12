import { useLocation, useNavigate } from "react-router-dom";
import formatTimestamp from "../../utils/formatTimestamp";

const SinglePostCards = ({ data, setSelectedItem }) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (path, data) => {
    navigate(`${path}`, {
      state: {
        payload: data,
        type: "view",
        previousPath: location.pathname,
      },
    });
  };

  
  return (
    <>
      <div className="card card-compact bg-base-100 w-[500px] h-auto shadow-xl">
        <div className="card-body">
          <p className="text-left">{formatTimestamp(data?.timestamp)}</p>
          <p className="text-base text-neutral-900 font-poppins text-left font-bold break-words">
            {data?.title}
          </p>
          <p className="text-left break-words">{data?.about}</p>
          <p className="text-left font-bold">
            <br />
          </p>
          <p className="text-left font-bold break-words">
            {data?.name} <br /> {data?.email}
          </p>
          <div className="card-actions flex gap-2 flex-wrap py-10">
            <div>
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
            <button
              onClick={() =>
                navigate(`/update_post`, {
                  state: {
                    payload: data,
                    type: "edit",
                    previousPath: location.pathname,
                  },
                })
              }
              className="btn-edit"
            >
              Edit
            </button>
            <label htmlFor="ConfirmationModal" className="btn-delete">
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostCards;
