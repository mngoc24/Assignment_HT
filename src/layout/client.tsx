import React from 'react'
import Header from '../components/client/header'
import Footer from '../components/client/footer'
import { Outlet } from 'react-router-dom'


const Client = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Client