import React from 'react'
import { FaStar } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { togglefavourites } from '../features/favourites/favouriteSlice'
import { useNavigate } from 'react-router'

function Card({article , isFavourites , index }) {

    const navigate = useNavigate()


    const dispatch = useDispatch()
        const handleFavourite = (article) => {
            dispatch(togglefavourites(article))
    
          }


  return (
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
  
                           <FaStar
                                          onClick={() => handleFavourite(article)}
                                          className={`${
                                              isFavourites ? "text-yellow-400" : "text-black"
                             } text-2xl cursor-pointer`}
                                      />
                                  </div>
                              </div>
  )
}

export default Card