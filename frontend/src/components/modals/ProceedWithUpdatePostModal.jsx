import React from "react";

const ProceedWithUpdatePostModal = ({
  info,
  handleChange,
  handleSubmit,
  isPostRequestLoading,
}) => {
  return (
    <>
      <input type="checkbox" id="infoPopUp" className="modal-toggle" />
      <div className="modal px-6" role="dialog">
        <div className="modal-box w-full max-w-[640px] bg-neutral-50  h-auto rounded-md">
          <div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-[#404040]-sm font-bold mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={info.name}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-900"
                    onChange={(e) => handleChange(e, 50)}
                  />
                  {info.name.length == 50 && (
                    <p className="text-red-600 font-poppins">
                      Max length 50 characters
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-[#404040] text-sm font-bold mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={info.email}
                    placeholder="john@example.com"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500  text-neutral-900"
                    onChange={(e) => handleChange(e, 50)}
                  />
                  {info.email.length == 50 && (
                    <p className="text-red-600 font-poppins">
                      Max length 50 characters
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-[#404040] text-sm font-bold mb-2"
                  >
                    Your title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={info.title}
                    placeholder="Title here.."
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500  text-neutral-900"
                    onChange={(e) => handleChange(e, 50)}
                  />
                  {info.title.length == 50 && (
                    <p className="text-red-600 font-poppins">
                      Max length 50 characters
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-[#404040] text-sm font-bold mb-2"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    value={info.about}
                    rows="4"
                    placeholder="About.."
                    onChange={(e) => handleChange(e)}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-900"
                  ></textarea>
                  {info.about.length == 1000 && (
                    <p className="text-red-600 font-poppins">
                      Max length 1000 characters
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="secret"
                    className="block text-[#404040] text-sm font-bold mb-2"
                  >
                    Secret Key
                  </label>
                  <input
                    type="text"
                    id="secret"
                    name="secret"
                    value={info.secret}
                    placeholder="secret here.."
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500  text-neutral-900"
                    onChange={(e) => handleChange(e, 50)}
                  />
                  {info.secret.length == 50 && (
                    <p className="text-red-600 font-poppins">
                      Max length 50 characters
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={isPostRequestLoading}
                    type="submit"
                    className=" text-white px-4 py-2 rounded-md bg-blue-600 focus:outline-none"
                  >
                    Submit
                  </button>
                  <label
                    htmlFor="infoPopUp"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md  focus:outline-none focus:shadow-outline-blue cursor-pointer"
                  >
                    Close
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-action"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProceedWithUpdatePostModal;
