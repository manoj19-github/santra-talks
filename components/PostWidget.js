import React,{useState,useEffect} from 'react'
import moment from "moment"
import Link from "next/link"
import {getRecentPost,getSimilarPosts} from "../services"

const PostWidget = ({categories,slug}) => {
  const [relatedPost,setRelatedPost]=useState([])
  useEffect(async()=>{
    let result
    if(slug){
      result=await getSimilarPosts(categories,slug)
      setRelatedPost(result)


    }else{
      result=await getRecentPost()
      setRelatedPost(result)


    }
  },[slug])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold text-pink-500 text-center pb-4 border-b border-blue-500">
        {slug?`Related Posts`:`Recent Posts`}
      </h3>
      {relatedPost.map((post,index)=>(
        <div
          key={index}
          className="flex items-center w-full mb-4 border-b border-gray-400 pb-4">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              alt={post.title}
              height="200px"
              width="200px"
              className="align-middle object-cover w-full"
             />

          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className="text-md"
              >
                <span className="line">{post.title}</span>
              </Link>
          </div>

          </div>
      ))}


    </div>
  )
}

export default PostWidget
