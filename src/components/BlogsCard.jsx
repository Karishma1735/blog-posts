import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { FaRegStar, FaRegUserCircle, FaStar } from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";
import { addFavourite, togglefavourites } from '../features/favourites/favouriteSlice';
import Card from './Card';

const BlogsCard = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  // const [favourites, setFavourites] = useState([])
  const dispatch = useDispatch()
  const favourites = useSelector((state) => state?.favourites.items)
  const postsPerPage = 9;

  console.log(favourites);




  const fetchArticles = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/everything?q=tesla&from=2025-10-06&sortBy=publishedAt&apiKey=8b966d015fd94ebd9c9590b0ff078835")
      console.log(response.data.articles[0])
      const data = response.data.articles
      console.log(data);

      setArticles(data)
      setLoading(false)
      console.log();

    } catch (error) {
      console.log("error fetching api");
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchArticles()
  }, [])

  let lastIndex = currentPage * postsPerPage
  let firstIndex = lastIndex - postsPerPage
  let currentPosts = articles.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(articles.length / postsPerPage);

  const handlenextpage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    console.log("button clicked");

  }

  const handleprevpage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
    console.log("Prev button clicked");

  }

  const handleFavourite = (article) => {
    dispatch(togglefavourites(article))
    // dispatch(addFavourite(article));
  }


  return (
    <div className='bg-sky-100'>

      <div className="flex flex-wrap justify-between items-center py-4 px-15 bg-[#3E6589] text-yellow-400 font-bold font-serif ">
        <h1 className="text-3xl font-semibold tracking-wide">
          Blog App
        </h1>

        <div className="flex items-center gap-6 text-3xl">
          <IoStarOutline
            className="cursor-pointer hover:text-black"
            title="Profile / Favourites"
            onClick={() => navigate('/favourite')}
          />
        </div>
      </div>
      {loading ? (
       <div className="bg-black h-screen flex flex-col items-center justify-center ">
    <span className="loader "></span>
    <p className="text-white mt-6 text-lg tracking-wide">Loading...</p>
  </div>) : (
        <div className="flex flex-wrap justify-center gap-8 p-8">
          {currentPosts.map((article, index) => {
            // const isFavourites = favourites.includes(article);
            const isFavourites = favourites.some(fav => fav.url === article.url);


            return (
              <Card
                key={index}
                article={article}
                isFavourites={isFavourites}
                onFavouriteToggle={handleFavourite}
              />
            );
          })}
        </div>

      )}
      <div className='flex flex-row gap-12 justify-center p-4'>

        <button onClick={handleprevpage}
          disabled={currentPage === 1}
          className='inline-block text-white bg-[#80b9ba] p-4 rounded-lg text-xl hover:bg-[#1d305f] disabled:opacity-50 w-40 '
        >Previous</button>

        <span className='p-4'>Page {currentPage} of {totalPages}</span>

        <button onClick={handlenextpage} disabled={currentPage === totalPages}
          className='inline-block text-white bg-[#80b9ba] p-4 rounded-lg text-xl hover:bg-[#1d305f] disabled:opacity-50 w-40'

        >Next</button>
      </div>
    </div>
  )
}

export default BlogsCard