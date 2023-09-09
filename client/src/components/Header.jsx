import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export const Header = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios
      .get("/articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des articles :", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  function truncateText(text, wordCount) {
    const words = text.split(" ");
    if (words.length <= wordCount) {
      return text;
    }
    const truncatedText = words.slice(0, wordCount).join(" ") + "...";
    return truncatedText;
  }

  let filteredArticles = articles;
  if (category) {
    filteredArticles = articles.filter((article) =>
      article.checkBox.includes(category)
    );
  }

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
            <ul className="grid mt-2 gap-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              <li className="cursor-pointer gap-1 bg-transparent p-6 text-4xl text-gray-600 inline-flex justify-center ">
                <a className="hover:text-violet-400" onClick={() => handleCategoryClick("stories")}>Stories</a>
              </li>
              <li className="cursor-pointer gap-1 bg-transparent p-6 text-4xl text-gray-600 inline-flex justify-center ">
                <a className="hover:text-violet-400" onClick={() => handleCategoryClick("countries")}>Countries</a>
              </li>
              <li className="cursor-pointer gap-1 bg-transparent p-6 text-4xl text-gray-600 inline-flex justify-center ">
                <a className="hover:text-violet-400" onClick={() => handleCategoryClick("series")}>Series</a>
              </li>
            </ul>
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
      {/* ------------------------------------- */}
      <main>
        <div>
          <h1 className="flex justify-center text-2xl">
            Liste des articles publiés
          </h1>
        </div>
        <div className="p-6 grid gap-3 md:grid-cols-3">
          {filteredArticles.map((article) => (
            <div key={article._id}>
              <div
                key={article._id}
                className="  bg-slate-200 gap-4 p-4 my-5 rounded-2xl"
              >
                <Link to={"/article/"+ article._id}>
                  <div className="bg-slate-200 gap-4 p-4 mb-3 rounded-2xl cursor-pointer">
                    <div className="bg-gray-300 rounded-2xl">
                      {article.image && (
                        <img
                          src={article.image}
                          className="rounded-2xl h-full object-cover"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="px-2">
                      <h2 className="text-xl">{article.title}</h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncateText(article.content, 10),
                        }}
                        className="article-content"
                      ></div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
