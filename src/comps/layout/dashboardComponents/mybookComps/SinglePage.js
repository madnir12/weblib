import React from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { BsPlusLg } from 'react-icons/bs'
import BtnByVerse2 from '../../verse-buttons/BtnByVerse2'
import { updateDocField } from '../../../../assets/config/firebase'
import {useLocation,useNavigate} from 'react-router-dom'
import { increment,arrayUnion} from 'firebase/firestore'
const SinglePage = ({ pages }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const docId = location.pathname.split("/dashboard/mybook/")[1] // to get doc id
  // this function use to update last edit date
  const updateBookEditDate = async ()=>{
    let obj = {
      lastEditAt: new Date()
    }
    updateDocField("books_array",docId,obj,navigate(`/editor/${docId}/page=${pages+1}`));
  } // ends updatebookeditdate function
  // this function use to increment pages
  const incrementPageByOne = ()=>{
    let obj = {
      numberOfPages: increment(1)
    }
    updateDocField("books_array",docId,obj,updateBookEditDate);

  } // ends page increment function
  // this function parform all steps to create a new page
  const createNewPage = ()=>{
    
    const initialPage = {
      pages: arrayUnion({
  visibility: "private",
  CreatedAt: new Date(),
  lastEditAt: new Date(),
  content: "",
  otherUsers: [],
  pageNumber: pages+1
})}; // use to create an initial page
    updateDocField("books_array",docId,initialPage,incrementPageByOne)
  } // ends create new page function
  return (
    <div className="single-page">
      <div className="top-bar">
        <div className="search-pages">
        <input type="number" />
        <span>/{pages}</span>
        </div>
        <div className="navigate">
        <span className="prev"><MdNavigateBefore /></span>
        <span className="next">
          <MdNavigateNext />
        </span>
        </div>
        <BtnByVerse2 text="Add Page" icon={<BsPlusLg />} clickAction={createNewPage}/>

      </div>
      <div className="page-div-container">
        <div className="page">
          
        </div>
      </div>
    </div>
  )
}

export default SinglePage