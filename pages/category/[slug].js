import React from 'react'
import {getCategoriesPost,getPosts} from "../../services"
import Head from 'next/head'
import {PostCard,PostWidget,Categories,Header}
from "../../components"
import {FeaturedPosts} from "../../sections"
import Link from "next/link"

const CategoryPage = ({posts}) => {

  if(posts.length==0){
    return(
      <div className="container mx-auto lg:px-8 px-2 mb-8">
        <h1 className="text-white font-bold text-center">No Post Available</h1>

      </div>
    )
  }
  return (
    <div className="container mx-auto lg:px-8 px-2 mb-8">
      <Head>
        <title>{posts[0].categories[0].name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <FeaturedPosts />
        <h3 className="mb-5 font-bold text-pink-500 text-lg  ml-4 " style={{textDecoration:"underline"}}>Talks For {posts[0].categories[0].name}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">


        <div className="lg:col-span-8 col-span-1">
          {
            posts.map((post,index)=>(
              <PostCard post={post} key={index}/>
            ))
          }

        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget/>
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CategoryPage
export async function getServerSideProps({params}){
  const posts=(await getCategoriesPost(params.slug)|| '')

  return {
    props:{
      posts
    }
  }
}


// export async function getStaticPaths(){
//   const posts=await getPosts()
//   const categories=posts.map(({node:{categories}})=>categories)
//   return{
//     paths:categories.map((category)=>category.slug),
//     fallback:false
//   }
// }
