import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const BlogsCard = ({ article }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 10



    const fetchArticles = async () => {
        try {
            const response = await axios.get("https://newsapi.org/v2/everything?q=tesla&from=2025-10-04&sortBy=publishedAt&apiKey=8b966d015fd94ebd9c9590b0ff078835")
            console.log(response.data.articles[0])
            const data = response.data.articles
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


    return (
        <div className='bg-sky-100'>

            {loading ? (
                <div className='bg-black h-screen '><div className=' p-10'>
                    <span class="loader"></span>
                    <p className='text-white'>Loading...</p>
                </div></div>) : (<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8" >
                    {currentPosts.map((article, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg hover:shadow-2xl flex flex-col cursor-pointer"
                            onClick={() => navigate(`/details/${index}`, { state: { article } })}
                        >
                            <img src={article?.urlToImage || "https://www.leblogauto.com/wp-content/uploads/2025/10/Screenshot-2025-10-29-13.03.30-1.png"} alt="No image found" className="w-full h-80 object-cover rounded-lg" />
                            <p className='p-4 font-bold'>{article.title.slice(0, 80)}</p>
                            <p className='p-4'>{article.description.slice(0, 100)}</p>
                            <div className="flex items-center gap-3 px-4 pb-4">

                                <img
                                    src="https://i.pravatar.cc/40?img=5"
                                    alt="author"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        {article.author}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(article.publishedAt).toDateString()}
                                    </p>
                                </div>
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