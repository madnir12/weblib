import React, { useEffect, useState } from 'react'
import { auth } from '../../assets/config/firebase'
import Profile from './Profile'
import { getSingleDoc } from '../../assets/config/firebase'
import BtnByVerse1 from './verse-buttons/BtnByVerse1'
function Header({setModelActive}) {
  const [profile, setProfile] = useState()
  useEffect(() => {
    console.log(auth.currentUser !== null)
   if(auth.currentUser) getSingleDoc("users", auth.currentUser.uid, setProfile)

  }, [])
  const setModel = ()=>{
    setModelActive(true)
  }
  return (
  <>
    <input type="checkbox" id="check"></input>
    <div className="header1">
      <div className="header">
        <div className="left">
          {
          window.location.href.includes("dashboard") && <label for="check">
            <i class="fas fa-bars" id="sidebar_btn"></i>
          </label>
          }
          <img src="https://raw.githubusercontent.com/madnir12/showon/main/ISDP14_14_-removebg-preview.png" alt="" />

        </div>
        <div className="right">
          <BtnByVerse1 text="Add New Book" clickAction={setModel}/>
        <Profile {...profile} />
        </div>
      </div>
    </div>
  </>
  )
}

export default Header