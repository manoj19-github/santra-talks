import React from 'react'
import Image from "next/image"
const Author = ({author}) => {
  return (
    <div
    className="text-center mt-20 p-12 relative rounded bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 right-2 -top-12">

        <Image
          alt={author.name}
          height="80px"
          width="80px"
          unoptimized
            src={author.photo.url}

        />
      </div>
        <h3 className="text-white mt-4 mb-4 text-xl font-bold">
          {author.name}
        </h3>
        <p className="text-white text-lg">{author.bio}</p>

    </div>

  )
}

export default Author
