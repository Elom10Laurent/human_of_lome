import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const ArticleBank = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalArticles, setTotalArticles] = useState(0);
  const [article, setArticle] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`/articles/bank`)
      .then((response) => {
        setArticles(response.data);
        setTotalArticles(response.headers["x-total-count"]);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des articles :", error);
      });
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalArticles / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  function truncateText(text, wordCount) {
    const words = text.split(" ");
    if (words.length <= wordCount) {
      return text;
    }
  }

  return (
    <div>
      <h1>Notre articles</h1>
      <div className="grid  gap-12sm:grid-cols-2 lg:grid-cols-4">
        {articles.length > 0 &&
          articles.map((articles) => (
            <div key={articles._id} className=" gap-4 p-4 mb-3  cursor-pointer">
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
      <footer className="">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </footer>
    </div>
  );
};

export default ArticleBank;
