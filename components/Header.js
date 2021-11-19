import React,{useState,useEffect,useContext} from 'react'
import {getCategories} from "../services"
import Link from "next/link"

const Header = () => {
  const [categories,setCategories]=useState([])
  useEffect(()=>{
    getCategories()
    .then((newCategories)=>setCategories(newCategories))
  },[])
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="border-b w-full inline-block border-blue-400 py-2">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white shadow-lg" style={{textShadow:"3px 3px 3px rgba(39, 161, 57 ,0.7)"}}>
              Santra Talks
            </span>
            </Link>
        </div>
        <div className="hidden md:float-left md:contents">
        {
          categories.map((category,index)=>(

              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transition duration-500 hover:text-pink-600">
                  {category.name}
                </span>
              </Link>
          ))
        }

        </div>
      </div>

    </div>
  )
}

export default Header
