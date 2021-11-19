import React,{useState,useEffect} from 'react'
import Link from "next/link"
import {getCategories} from "../services"
import {IoIosShareAlt} from "react-icons/io"

const Categories = () => {
  const [categories,setCategories]=useState([])
  useEffect(()=>{
    getCategories()
    .then((newCategories)=>setCategories(newCategories))
  },[])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 text-pink-500 font-semibold text-center pb-4 border-b border-blue-500">
        Categories
      </h3>
      {categories.map((category,index)=>(
        <div key={index}>
          <Link
            key={index}
            href={`/category/${category.slug}`}
          >
            <span className="cursor-pointer block pb-3 mb-3 flex items-center ">
              <span className="mr-5"><IoIosShareAlt size={24} className="text-pink-500 "/></span><span className="border-b border-gray-400 pb-2 ">{category.name}</span>
            </span>
        </Link>

        </div>
      ))}

    </div>
  )
}

export default Categories
