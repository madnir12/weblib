import React, { useState, useEffect } from 'react'
import Header1 from '../comps/layout/Header1'
import Sidebar from '../comps/layout/Sidebar'
import { getSingleDoc, getProfile,  auth } from '../assets/config/firebase'
import Popup from '../comps/layout/Popup'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
          const [profile, setProfile] = useState()
          const [modelActive, setModelActive] = useState(false);

          useEffect(() => {
                   getSingleDoc("users", getProfile().profileID, setProfile) 
          }, [])
          return (
                    <>
                              <Header1 setModelActive={setModelActive} />
                              <Sidebar {...profile} />
                              <div className="content">
                                        <Outlet />
                              </div>
                              <Popup modelActive={modelActive} cancel={setModelActive} />
                    </>
          )
}

export default Dashboard