import React from "react";
import {Link} from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav className="bg-white  fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 ">
        <Link className="flex border mx-auto bg-red-200 border-gray-300 gap-2 rounded-full">
          <p>
            Connect
          </p>
        </Link>
      </nav>
    </div>
  );
};
