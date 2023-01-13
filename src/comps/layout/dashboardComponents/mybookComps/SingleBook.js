import React, { useEffect,useState } from 'react'
import {useLocation} from 'react-router-dom'
import { getSingleDoc } from '../../../../assets/config/firebase'
import SinglePage from './SinglePage'
import BtnByVerse2 from '../../verse-buttons/BtnByVerse2'
const SingleBook = () => {
  const location = useLocation()
  const [singleBookData, setSingleBookData] = useState("")
  const [ready, setReady] = useState(false)
  useEffect(()=>{
    getSingleDoc("books_array",location.pathname.split("/dashboard/mybook/")[1],setSingleBookData)
  },[])
  useEffect(()=>{
    if(singleBookData !== "") setReady(true)
  },[singleBookData])
  console.log(singleBookData)
  const {bookCover,name,bookCreatedAt,lastEditAt,visibility,categories,numberOfPages} = singleBookData
  if(ready) return (
    <>
    
    <div className='dashboard-single-book'>
      <img src={bookCover} alt="" />
      <div className="book-content">
        <h3>{name}</h3>
        <span>Created At: {bookCreatedAt.toDate().toDateString()}</span><br />
        <span>Last Edit At: {lastEditAt.toDate().toDateString()}</span><br /><br />
        <h4>Status:  </h4> <span>{visibility}</span><br />
        <h4>categories:  </h4><span>{
          categories.map((item)=> item)
          }</span>
      </div>
       
    </div>
    <SinglePage pages={numberOfPages}/>
    </>
  )
}

export default SingleBook