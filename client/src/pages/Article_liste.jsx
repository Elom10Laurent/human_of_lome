import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";

const ArticleListe = () => {
  const { ready, user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);

  if (!ready) {
    return "Loading...";
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axios.get("/article").then(({ data }) => {
      setArticles(data);
    });
  }, []);

  
  function truncateText(text, wordCount) {
    const words = text.split(" ");
    if (words.length <= wordCount) {
      return text;
    }
    const truncatedText = words.slice(0, wordCount).join(" ") + "...";
    return truncatedText;
  }

  return (
    <div>
      <div>
        <h1 className="flex justify-center text-2xl">
          Liste des articles publiés
        </h1>
      </div>
      <div className="p-6">
        {articles.length > 0 &&
          articles.map((singleArticle) => (
            <Link
              to={"/account/my_article/" + singleArticle._id}
              key={singleArticle._id}
            >
              <div className=" md:flex bg-red-100 gap-4 p-4 mb-3 rounded-2xl cursor-pointer">
                <div className="  bg-gray-300 rounded-2xl">
                  {singleArticle.image && (
                    <img
                      src={singleArticle.image}
                      className=" rounded-2xl  h-full   object-cover  "
                      alt=""
                    />
                  )}
                </div>
                <div className="px-2">
                  <h2 className="text-xl ">{singleArticle.title}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateText(singleArticle.content, 20),
                    }}
                    className="article-content"
                  ></div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ArticleListe;
