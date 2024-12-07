import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <div class="flex flex-col justify-center items-center gap-[100px]">
        <div class="flex flex-col justify-center items-center text-center">
          <h3 class="text-black-700 font-mont text-[60px] font-extrabold uppercase leading-[130%] mb-6">
            404 <br /> PAGE NOT FOUND
          </h3>
          <div class="flex justify-center">
            <Link
              to="/"
              class="rounded-xl btn btn-error text-white  font-poppins text-xl font-normal"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
