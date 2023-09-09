import { Link, useParams } from "react-router-dom";
import WritingPage from "./Writing_page";

export const AddArticle = () => {
  const { action } = useParams();
  
  return (
    <div className="">

      {action !== "new" && (
        <div className="text-center mt-10">
          <Link
            to={"/account/write/new"}
            className=" inline-flex bg-slate-700 text-white px-6  text-center py-2 rounded-full "
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
                strokeLinecap="round" strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Add new Article
          </Link>
        </div>
      )}
      { action === "new" && (
        <div>
        <WritingPage
        />
        </div>
      )}
    </div>
  );
};
