import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const [articles, setArticles] = useState([]);

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
      <main>
        <div>
          <h1 className="flex justify-center text-2xl">
            Liste des articles publiés
          </h1>
        </div>
         <div className="p-6 grid gap-3 md:grid-cols-3">
            {articles.length > 0 &&
              articles.map((singleArticle) => (
                <div
                  key={singleArticle._id}
                  className="  bg-slate-200 gap-4 p-4 my-5 rounded-2xl"
                >
                  <Link to={"/account/my_article/update/" + singleArticle._id}>
                    <div className="  bg-slate-200 gap-4 p-4 mb-3 rounded-2xl cursor-pointer">
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
                            __html: truncateText(singleArticle.content, 10),
                          }}
                          className="article-content"
                        ></div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div> 
      </main>
    </div>
  );
};

export default Main;
