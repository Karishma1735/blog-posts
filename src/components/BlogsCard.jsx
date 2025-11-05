import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { FaRegStar } from "react-icons/fa";

const BlogsCard = ({ article }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const [favourites, setFavourites] = useState([])
    const postsPerPage = 9



    const fetchArticles = async () => {
        try {
            const response = await axios.get("https://newsapi.org/v2/everything?q=tesla&from=2025-10-05&sortBy=publishedAt&apiKey=8b966d015fd94ebd9c9590b0ff078835")
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

    const favouritehandler = () => {
        if (favourites) {
            setFavourites(false)
        } else {
            setFavourites(true)
        }
    }


    return (
        <div className='bg-sky-100'>

            {loading ? (
                <div className='bg-black h-screen '><div className=' p-10'>
                    <span className="loader"></span>
                    <p className='text-white'>Loading...</p>
                </div></div>) : (<div className="flex flex-wrap justify-center gap-8 p-8">
  {currentPosts.map((article, index) => (
    <div
      key={index}
      className="bg-white shadow-lg rounded-lg flex flex-col cursor-pointer w-100"
    >
      <img
        src={
          article?.urlToImage ||
          "https://www.leblogauto.com/wp-content/uploads/2025/10/Screenshot-2025-10-29-13.03.30-1.png"
        }
        alt="No image found"
        className="w-full h-60 object-cover rounded-t-lg"
        onClick={() => navigate(`/details/${index}`, { state: { article } })}
      />
      <div className="p-4 flex flex-col">
        <p className="font-bold mb-2">{article.title.slice(0, 60)}</p>
    <p className="text-gray-700 ">
          {article?.description?.slice(0, 100) || "No description found"}
     </p>
      </div>


      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="author"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
        <p className="text-sm font-semibold">{article.author || "Unknown"}</p>
         <p className="text-xs text-gray-500">
              {new Date(article.publishedAt).toDateString()}
          </p>
       </div>
        </div>

        <FaRegStar
          onClick={favouritehandler} className={`${
            favourites ? "text-yellow-400" : "text-black"
          } text-2xl cursor-pointer`}
        />
      </div>
    </div>
  ))}
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