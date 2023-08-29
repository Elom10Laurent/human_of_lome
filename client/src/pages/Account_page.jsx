import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import Writing_page from "./Writing_page";
import Article_liste from "./Article_liste";


export const Account_page = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { subpage } = useParams();
  
  async function logout(){
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);

  }

  if (!ready) {
    return "loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClass(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";

    if (type === subpage) {
      classes += " bg-slate-700 text-white";
    } else {
      classes += " bg-gray-200";
    }

    return classes;
  }
  if (redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
        <Link className={linkClass("profile")} to={"/account"}>
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClass("write")} to={"/account/write"}>
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Write article
        </Link>
        <Link className={linkClass("my_article")} to={"/account/my_article"}>
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
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
            />
          </svg>
          My collections{" "}
        </Link>
      </nav>
      <div className="container max-w-xl mx-auto">
        {subpage === "profile" && (
          <div className="text-center">
            <p className="mb-4">
              Connecté en tant que <span>{user.username}</span>
            </p>
            <button onClick={logout} className="bg-slate-700 py-2 px-10 text-white rounded-full max-w-sm">
              Déconnexion
            </button>
          </div>
        )}

        {subpage === "write" && (
          <div>
            <Writing_page/>
          </div>
        )}

        {subpage === "my_article" && (
          <div>
          <Article_liste/>
          </div>
        )}
        
      </div>
    </div>
  );
};
