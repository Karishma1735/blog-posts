import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { togglefavourites } from '../features/favourites/favouriteSlice';
import Card from './Card';

function Favourites() {
    const dispatch = useDispatch()
  const favourites = useSelector((state) => state.favourites.items);
  console.log(favourites);
    const handleFavourite = (article) => {
        dispatch(togglefavourites(article))

      }
  
  return (
    <div className='bg-sky-100 h-screen'>
    <div className="flex flex-wrap justify-center gap-8 p-4 ">

        {favourites.length===0?
        
        <div>

            <p className='text-4xl font-bold '>U have not add any favourites yet</p>
        </div>:(<div className="flex flex-wrap justify-center item-center gap-8 p-4">

              {favourites.map((article, index) => {
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
        </div>)}
                      
                    </div>
                    </div>
  )
}

export default Favourites