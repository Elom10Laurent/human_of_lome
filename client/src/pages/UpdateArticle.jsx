import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

const UpdateArticle = () => {
  const { id } = useParams();
  const { ready, user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [checkBox, setCheckBox] = useState([]);

  if (!ready) {
    return "Loading...";
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/article/" + id).then((response) => {
      const { data } = response;
      setImage(data.image);
      setTitle(data.title);
      setContent(data.content);
      setCheckBox(data.checkBox);
    });
  }, [id]);

  function updateChecker(e) {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      setCheckBox([...checkBox, value]);
    } else {
      setCheckBox(checkBox.filter((item) => item !== value));
    }
  }

  function updateArticle(ev) {
    ev.preventDefault();
    const articleData = {
      id,
      image,
      title,
      content,
      checkBox,
    };
    axios
      .put("update/" + id, articleData)
      .then(() => setRedirect(true))
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de l'article : ", error)
      );
  }

  if (redirect) {
    return <Navigate to={"/account/my_article"} />;
  }

  return (
    <div>
      <div className="w-full p-4 bg-white border rounded-lg shadow-md">
        <form onSubmit={updateArticle}>
          <div className="grid-cols flex justify-around lg:grid-cols- gap-2">
            <label className="border border-slate-700 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
              <input
                className="mr-2"
                value="stories"
                name="stories"
                checked={checkBox.includes("stories")}
                onChange={updateChecker}
                type="checkbox"
              />
              <span>Stories</span>
            </label>
            <label className="border border-slate-700 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
              <input
                className="mr-2"
                value="countries"
                name="countries"
                checked={checkBox.includes("countries")}

                onChange={updateChecker}
                type="checkbox"
              />
              <span>Countries</span>
            </label>
            <label className="border border-slate-700 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
              <input
                className="mr-2"
                value="series"
                name="series"
                checked={checkBox.includes("series")}

                onChange={updateChecker}
                type="checkbox"
              />
              <span>Series</span>
            </label>
          </div>
          <div className="flex">
            <div className="mr-4">
              <input
                className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                name="image"
                value={image}
                onChange={(ev) => setImage(ev.target.value)}
                placeholder="Lien de l'image"
              />
              <input
                className="w-full mt-2 py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                name="title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="Titre"
              />
              <div className="mt-2">
                <ReactQuill
                  className="rounded-lg border focus:outline-none focus:border-blue-500"
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="bg-slate-700 py-2 px-10 text-white rounded-full">
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;
