const ReviewCard = ({ data }) => {
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 min-h-full shadow-xl">
        <div className="card-body">
          <p className="text-base text-neutral-900 font-poppins text-left">
            " {data?.review} "
          </p>
          <p className="text-left font-bold">
            {data?.author} <br />
            {data?.position}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
