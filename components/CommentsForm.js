import React,{useState,useEffect,useRef} from 'react'
import {submitComment} from "../services"
const CommentsForm = ({slug}) => {
  const[error,setError]=useState(false)

  const[localStorage,setLocalStorage]=useState(null)
  const[showSuccessMessage,setShowSuccessMessage]=useState(false)
  const commentEl=useRef()
  const nameEl=useRef()
  const emailEl=useRef()
  const storeDataEl=useRef()
  useEffect(()=>{
    nameEl.current.value=window.localStorage.getItem("santraTalks-reader-name")?
    window.localStorage.getItem("santraTalks-reader-name"):''
    emailEl.current.value=window.localStorage.getItem("santraTalks-reader-email")?
    window.localStorage.getItem("santraTalks-reader-email"):''
  },[])


  const handleCommentSubmit=async()=>{
    setError(false)
    const {value:comment}=commentEl.current
    const {value:email}=emailEl.current
    const {value:name}=nameEl.current
    const {checked:storeData}=storeDataEl.current

    if(!comment|| !name || !email){
      setError(true)
      return
    }
    const commentObj={
      name,email,comment,slug
    }
    if(storeData){
      window.localStorage.setItem("santraTalks-reader-email",email)
      window.localStorage.setItem("santraTalks-reader-name",name)
    }else{
      window.localStorage.removeItem("santraTalks-reader-email")
      window.localStorage.removeItem("santraTalks-reader-name")
    }
    const data=await submitComment(commentObj)
    if(data){
      setShowSuccessMessage(true)
        commentEl.current.value=""
    }
    setTimeout(()=>{
        setShowSuccessMessage(false)
    },3000)

  }



  return (
    <div className="bg-white shadow-lg p-8 pb-12 mb-8">
      <h1 className="text-xl mb-8 font-semibold border-b border-gray-400 pb-4">
        Leave A Reply
      </h1>
      <div className="grid grid-cols-1 gap-4 mb-3">
        <label>Comment</label>
        <textarea
          ref={commentEl}
          className="py-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-300"
          placeholder="Write Your Comment .."
          name="comment"
          >

        </textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
        <label>Your Name</label>
        <input
          type="text"
          ref={nameEl}
            className="py-1 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-300"
          name="name"
          placeholder="Name"
        />
        <label>Email</label>
        <input
          type="text"
          ref={emailEl}
            className="py-1 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-300"
          name="email"
          placeholder="Email"
        />


      </div>
      <div className="grid grid-cols-1 gap-4 mb-3">
        <div >

          <input  ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
           />
         <label className="text-gray-500 cursor-pointer ml-4 " htmlFor="storeData">Save My email and name for next time I comment .</label>
        </div>
      </div>
      {error &&(<p className="text-xs text-red-500">All Fields Are Required</p>)}
      <div className="mt-8">
        <button type="button"
          className="transition duration-500 ease hover:bg-indigo-900 inline-block p-2 bg-pink-600 text-white text-lg rounded-full"
          onClick={handleCommentSubmit}>Post Comment</button>
        {showSuccessMessage && (<span className="text-xl float-right font-semibold mt-2 text-green-500"></span>)}

      </div>
    </div>
  )
}

export default CommentsForm
