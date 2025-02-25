import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/admin/header'
import Sidebar from '../components/admin/sidebar'


const Dashboard = () => {
  return (
    <div className='bg-[#f6f9ff]'>
        <Header/>
        <div className='flex'>
        <Sidebar/>
        <div className='content'>
            <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default Dashboard