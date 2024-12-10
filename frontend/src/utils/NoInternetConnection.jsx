import React, { useState, useEffect } from "react";

const NoInternetConnection = (props) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  // if user is online, return the child component else return a custom component
  if (isOnline) {
    return props.children;
  } else {
    return (
      <div className="container mx-auto h-screen overflow-hidden flex justify-center items-center">
        <div>
          <h1 className="font-poppins text-3xl text-red-700">
            No Internet Connection. Please try again later.
          </h1>
        </div>
      </div>
    );
  }
};

export default NoInternetConnection;
