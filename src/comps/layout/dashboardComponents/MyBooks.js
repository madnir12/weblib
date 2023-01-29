import React from 'react'
import { getDocsInCollection, auth } from '../../../assets/config/firebase'
import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const MyBooks = ({ setter, singleBook }) => {
  const [adminContent, setAdminContent] = useState([])
  const location = useLocation()

  useEffect(() => {
    getDocsInCollection("books_array", "autherId", "==", auth.currentUser.uid, setAdminContent)
  }, [])
  return (
    <div>
      <Outlet />
      {
        location.pathname === "/dashboard/mybook" && adminContent.length === 0 ? <h5>No Book Added</h5> : location.pathname === "/dashboard/mybook" && adminContent.map((doc) => {
          const { name, bookCover, bookCreatedAt } = doc.data()

          return (
            <>
              <div className="bookRaw">
                <img src={bookCover} alt="" />
                <div className="bookData">
                  <Link to={`/dashboard/mybook/${doc.id}`}><h4>{name}</h4></Link>
                  <span> Added At: {bookCreatedAt.toDate().toDateString()} </span>
                </div>
              </div>
            </>
          )
        }) 
      }
    </div>
  )
}

export default MyBooks