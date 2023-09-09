import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import OtherArticle from "./OtherArticle";

const PulicationPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  //recuperation de l'article spécifique à l'id
  useEffect(() => {
    axios
      .get("/article/" + id)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors 2 de la récupération des articles :", error);
      });
  }, [id]);
  // recuperation des commentaires de cet article specifique
  useEffect(() => {
    axios
      .get("/comments/" + id)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des commentaires :",
          error
        );
      });
  }, [id]);

  // Poster le commentaire

  const handleSubmitComment = async () => {
    try {
      await axios.post("/comments", {
        user: "userID",
        article: id,
        content: newComment,
      });
    } catch (error) {
      console.error("Erreur lors de la création du commentaire :", error);
    }
  };

  if (!article) {
    return <div>loading...</div>;
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  return (
    <div>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className=" grid md:gird-cols-2  mr-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Jese Leos"
                    />
                  </div>

                  <div>
                    <a
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      Jese Leos
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      Graphic Designer, educator & CEO Flowbite
                    </p>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time dateTime="2022-02-08" title="February 8th, 2022">
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {article.title}
              </h1>
            </header>
            <figure>
              <img
                src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                alt=""
              />
              <figcaption>Digital art by elolo</figcaption>
            </figure>
            <section className="not-format mt-2">
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </section>

            <section className="not-format mt-6">
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    votre commentaire
                  </label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Écrivez un commentaire..."
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    required
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmitComment}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Poster un commentaire
                </button>
              </form>

              {/* commentaire */}
              {comments.map((comment) => (
                <article
                  className="p-6 bg-slate-200 mb-6 text-base rounded-lg dark:bg-gray-900"
                  key={comment._id}
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough"
                        />
                        {comment.user === "Visiteur"
                          ? "Visiteur "
                          : comment.user}{" "}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime="2022-02-08" title="February 8th, 2022">
                          {formatDate(comment.createdAt)}
                        </time>
                      </p>
                    </div>
                    <button
                      id="dropdownComment1"
                      data-dropdown-toggle="dropdownComment1"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                    </button>
                    <div
                      id="dropdownComment1"
                      className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Edit
                          </a>
                        </li>
                        <li>
                          <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Remove
                          </a>
                        </li>
                        <li>
                          <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </footer>
                  <p>{comment.content}</p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                      Reply
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </article>
        </div>
      </main>
      {/* other component */}

      <aside
        aria-label="Related articles"
        className="py-8 lg:py-24 bg-gray-100 dark:bg-gray-800"
      >
        <OtherArticle />
      </aside>
    </div>
  );
};

export default PulicationPage;
