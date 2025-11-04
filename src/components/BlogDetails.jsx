import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;
  console.log(article);
  console.log(article.content);
  
  

  return (
    <div className="max-w-4xl  mx-auto p-8 shadow-lg my-4" >
        {/* <div className="flex flex-col item-center justify-center"> */}
    <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

    <p className="text-gray-500 text-sm mx-0 my-8 ">
        {article.author} | {new Date(article.publishedAt).toDateString()} | {article.source.name}
      </p>

      <img
        src={article.urlToImage}
        alt= "No image found"
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <div className="bg-gray-200 p-8 my-4 italic font-bold font-sans" >
      <p className="text-gray-700 leading-relaxed text-lg mb-4">
        { article.description || "NO DESCRIPTION AVAILABLE"}
      </p>

      </div>

      <p className="py-4">{article.content}</p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#80b9ba] text-white px-5 py-2 rounded hover:bg-[#1d305f]"
      >
        Read Full Article →
      </a>
      {/* </div> */}
    </div>
  );
};

export default DetailsPage;
