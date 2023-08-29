import axios from "axios";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

const WritingPage = () => {
  const { ready, user } = useContext(UserContext);
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

  function handleChecker(e) {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      setCheckBox([...checkBox, value]);
    } else {
      setCheckBox(checkBox.filter((item) => item !== value));
    }
  }

  async function SubmitArticle(e) {
    e.preventDefault();
    try {
      await axios.post("/article", {
        image,
        title,
        content,
        checkBox,
      });
      alert("Article enregistré !");
    } catch (error) {
      alert("Enregistrement échoué. Veuillez réessayer.");
    }
  }

  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-md">
      <form onSubmit={SubmitArticle}>
        <div className="grid-cols flex justify-around lg:grid-cols- gap-2">
          <label className="border border-slate-700 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              className="mr-2"
              value="stories"
              name="stories"
              onChange={handleChecker}
              type="checkbox"
            />
            <span>Stories</span>
          </label>
          <label className="border border-slate-700 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              className="mr-2"
              value="countries"
              name="countries"
              onChange={handleChecker}
              type="checkbox"
            />
            <span>Countries</span>
          </label>
          <label className="border border-slate-700 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              className="mr-2"
              value="series"
              name="series"
              onChange={handleChecker}
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
            Faire vérifier
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritingPage;
