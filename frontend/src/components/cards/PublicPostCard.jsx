import formatTimestamp from "../../utils/formatTimestamp";

const PublicPostCard = ({ data, setSelectedItem }) => {
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 min-h-full shadow-xl">
        <div className="card-body">
          <p className="text-left">{formatTimestamp(data?.timestamp)}</p>
          <p className="text-base text-neutral-900 font-poppins text-left font-bold">
            {data?.title}
          </p>
          <p className="text-left">{data?.about}</p>
          <p className="text-left font-bold">
            <br />
          </p>
          <p className="text-left font-bold">
            {data?.name} <br /> {data?.email}
          </p>
          <div className="card-actions justify-between">
            {/* <div className="flex gap-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.8283 9.4186L20.8282 9.41843C18.5878 5.89788 15.3515 3.92999 12 3.92999C10.3204 3.92999 8.68041 4.42003 7.17256 5.34551C5.66421 6.2813 4.29615 7.65444 3.17172 9.4186H20.8283ZM20.8283 9.4186C21.2661 10.1059 21.5 11.0397 21.5 11.9987C21.5 12.958 21.266 13.8885 20.8291 14.5702L20.8284 14.5713C19.7039 16.3355 18.3358 17.7087 16.8273 18.6445C15.3195 19.57 13.6796 20.06 12 20.06C8.64787 20.06 5.41201 18.1015 3.17217 14.5721L3.17172 14.5714M20.8283 9.4186L3.17172 14.5714M3.17172 14.5714C2.7338 13.8838 2.5 12.9525 2.5 11.995M3.17172 14.5714L2.5 11.995M2.5 11.995C2.5 11.0375 2.73377 10.1063 3.17164 9.41873L2.5 11.995ZM7.46 12C7.46 14.5053 9.48305 16.54 12 16.54C14.5169 16.54 16.54 14.5053 16.54 12C16.54 9.49466 14.5169 7.45999 12 7.45999C9.48305 7.45999 7.46 9.49466 7.46 12Z"
                    fill="#54A0FF"
                    stroke="#54A0FF"
                  ></path>
                  <path
                    d="M9.65039 12C9.65039 10.695 10.7077 9.64001 12.0004 9.64001C13.2942 9.64001 14.3604 10.7062 14.3604 12C14.3604 13.2916 13.2965 14.35 12.0004 14.35C10.7065 14.35 9.65039 13.2939 9.65039 12Z"
                    stroke="#54A0FF"
                  ></path>
                </svg>
              </span>
              <span className="text-neutral-800">{data?.views}</span>
            </div> */}
            <label
              htmlFor="codeViewPopUp"
              onClick={() => setSelectedItem(data)}
              className="cursor-pointer p-1 font-poppins text-white hover:text-neutral-800 bg-neutral-800 w-[110px] h-auto border-none hover:bg-tertiary-500 text-sm rounded-badge"
            >
              View Post
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicPostCard;
