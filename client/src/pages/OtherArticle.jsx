import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OtherArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`/articles`)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des articles :", error);
      });
  }, [id]);

  function truncateText(text, wordCount) {
    const words = text.split(" ");
    if (words.length <= wordCount) {
      return text;
    }
  }
  return (
    <div>
      <div className="px-4 mx-auto max-w-screen-xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          Autres articles
        </h2>

        <div className="grid  gap-12 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 lg:grid-cols-4">
          {articles.length > 0 &&
            articles.map((articles) => (
              <div
                key={articles._id}
                className=" gap-4 p-4 mb-3  cursor-pointer"
              >
                <Link to={"/article/" + article.id}>
                  <img
                    src={articles.image}
                    className="mb-5 rounded-lg"
                    alt="Image 1"
                  />

                  <h2 className="mb-2 sm:text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    {articles.title}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: truncateText(articles.content, 20),
                    }}
                  ></p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OtherArticle;
