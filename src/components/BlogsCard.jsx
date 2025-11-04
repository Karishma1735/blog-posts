import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const BlogsCard = ({article}) => {
    const [articles , setArticles] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchArticles = async() =>{
        try {
            const response = await axios.get("https://newsapi.org/v2/everything?q=tesla&from=2025-10-04&sortBy=publishedAt&apiKey=8b966d015fd94ebd9c9590b0ff078835")
            // console.log(response.data.articles[0].source)
            const data = response.data

            
            setArticles(data.articles.slice(0, 12))
            setLoading(false)
            console.log();
                
        } catch (error) {
            console.log("error fetching api");
             setLoading(false)
        }
    }
    

    // const navigateDetails = () =>{
    //     // const name = articles
    //     navigate(`/details/${article.source.name}`)
    // }

    useEffect(()=>{
        fetchArticles()
    },[])
    
  return (
    <div className='bg-sky-100'>

        {loading? (
            <div className='bg-black h-screen '><div className=' p-10'>
        <span class="loader"></span>
        <p className='text-white'>Loading...</p>
        </div></div>): (<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8" >
    {articles.map((article, index) => (
        <div
    key={index}
    className="bg-white shadow-lg rounded-lg hover:shadow-2xl flex flex-col cursor-pointer"
       onClick={() => navigate(`/details/${index}`, { state: { article } })}
  >
        <img src={article.urlToImage} alt="No image found" className="w-full h-80 object-cover rounded-lg" />
        <p className='p-4 font-bold'>{article.title.slice(0,80)}</p>
        <p className='p-4'>{article.description.slice(0,100)}</p>
      <div className="flex items-center gap-3 px-4 pb-4">
           
                <img
                  src="https://i.pravatar.cc/40?img=5"
                  alt="author"
                  className="w-10 h-10 rounded-full object-cover"
                />
              <div>
                <p className="text-sm font-semibold">
                  {article.author }
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toDateString()}
                </p>
              </div>
            </div>
    </div>
))}


    </div>)}
        {/* <h1 className='text-center text-3xl font-bold p-5'> Blogs Posts</h1> */}
      {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8" >
    {articles.map((article, index) => (
        <div
    key={index}
    className="bg-white shadow-lg rounded-lg hover:shadow-2xl flex flex-col cursor-pointer"
       onClick={() => navigate(`/details/${index}`, { state: { article } })}
  >
        <img src={article.urlToImage} alt="No image found" className="w-full h-80 object-cover rounded-lg" />
        <p className='p-4 font-bold'>{article.title.slice(0,80)}</p>
        <p className='p-4'>{article.description.slice(0,100)}</p>
      <div className="flex items-center gap-3 px-4 pb-4">
           
                <img
                  src="https://i.pravatar.cc/40?img=5"
                  alt="author"
                  className="w-10 h-10 rounded-full object-cover"
                />
              <div>
                <p className="text-sm font-semibold">
                  {article.author }
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toDateString()}
                </p>
              </div>
            </div>
    </div>
))}


    </div> */}
    </div>
  )
}

export default BlogsCard