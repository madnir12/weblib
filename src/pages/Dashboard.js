import React, { useState, useEffect } from 'react'
import Header1 from '../comps/layout/Header1'
import Sidebar from '../comps/layout/Sidebar'
import { getSingleDoc, getProfile,  auth } from '../assets/config/firebase'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
          const [profile, setProfile] = useState()
          

          useEffect(() => {
                   getSingleDoc("users", getProfile().profileID, setProfile) 
          }, [])
          return (
                    <>
                              <Header1/>
                              <Sidebar {...profile} />
                              <div className="content">
                                        <Outlet />
                              </div>
                    </>
          )
}

export default Dashboard