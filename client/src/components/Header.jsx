import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export const Header = () => {
  const { user, isLoggedIn } = useContext(UserContext);

  return (
    <div>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 mt-1 sm:py-32 ">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />

        <div className=" flex items-center justify-center just mx-auto max-w-7xl  text-center px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Human Of Lome
            </h2>
            <div className="grid mt-2 gap-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              <div className="cursor-pointer gap-1 bg-transparent p-6 text-4xl text-gray-600 inline-flex justify-center ">
                Stories
              </div>
              <div className="cursor-pointer gap-1 bg-transparent p-6 text-4xl text-gray-600 inline-flex justify-center ">
                Contrie
              </div>
              <div className="cursor-pointer gap-1 bg-transparent p-6 text-4xl text-gray-600 inline-flex justify-center ">
                Series
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-40 xl:mt-5  md:mt-5 lg:mt-5">
          {isLoggedIn ? (
            <Link
              className="flex justify-center text-white border rounded-full w-80 py-2"
              to="/account"
            >
              {!!user && <div> Hello {user.username}</div>}
            </Link>
          ) : (
            <Link
              className="flex justify-center text-white border rounded-full w-80 py-2"
              to="/login"
            >
              Connexion
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
