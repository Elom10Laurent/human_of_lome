import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import UpdateArticle from "./UpdateArticle";

const ArticleListe = () => {
  const { action, } = useParams();
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

  async function deleteArticle(id) {
    try {
      await axios.delete("/my_article/delete/" + id);
      const updatedArticles = articles.filter((article) => article._id !== id);
      setArticles(updatedArticles);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article : ", error);
    }
  }

  function truncateText(text, wordCount) {
    const words = text.split(" ");
    if (words.length <= wordCount) {
      return text;
    }
    const truncatedText = words.slice(0, wordCount).join(" ") + "...";
    return truncatedText;
  }

  return (
    <div className="">
      {action !== "update" && (
        <div>
          <div>
            <h1 className="flex justify-center text-2xl">
              Liste des articles publiés
            </h1>
          </div>
          <div className="p-6">
            {articles.length > 0 &&
              articles.map((singleArticle) => (
                <div
                  key={singleArticle._id}
                  className="md:flex bg-red-100 gap-4 p-4 my-5 rounded-2xl"
                >
                  <Link to={"/account/my_article/update/" + singleArticle._id}>
                    <div className="md:flex bg-red-100 gap-4 p-4 mb-3 rounded-2xl cursor-pointer">
                      <div className="bg-gray-300 rounded-2xl">
                        {singleArticle.image && (
                          <img
                            src={singleArticle.image}
                            className="rounded-2xl h-full object-cover"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="px-2">
                        <h2 className="text-xl">{singleArticle.title}</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: truncateText(singleArticle.content, 20),
                          }}
                          className="article-content"
                        ></div>
                      </div>
                    </div>
                  </Link>
                  <div className="absolute flex">
                    <button
                      onClick={() => deleteArticle(singleArticle._id)}
                      className="bg-slate-500 left-0 p-1 rounded-full text-white"
                    >
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {action === "update" && (
        <div>
        
          <UpdateArticle/>
        </div>
      )}
    </div>
  );
};

export default ArticleListe;
