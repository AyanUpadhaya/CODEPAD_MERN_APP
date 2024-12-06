import React from "react";

const ProceedWithUpdatePostModal = ({ info, setInfo, handleSubmit }) => {
  return (
    <>
      <input type="checkbox" id="infoPopUp" className="modal-toggle" />
      <div className="modal px-6" role="dialog">
        <div className="modal-box w-[640px] max-w-1/2 h-auto bg-white rounded-md">
          <div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-300 text-sm font-bold mb-2"
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
                    onChange={(e) =>
                      setInfo((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-300 text-sm font-bold mb-2"
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
                    onChange={(e) =>
                      setInfo((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-300 text-sm font-bold mb-2"
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
                    onChange={(e) =>
                      setInfo((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    value={info.about}
                    rows="4"
                    placeholder="About.."
                    onChange={(e) =>
                      setInfo((prev) => ({ ...prev, about: e.target.value }))
                    }
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-900"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    Secret Key
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={info.secret}
                    placeholder="secret here.."
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500  text-neutral-900"
                    onChange={(e) =>
                      setInfo((prev) => ({ ...prev, secret: e.target.value }))
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <button
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
