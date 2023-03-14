import React from 'react'
import Navbar from './navbar'

function Layout({children}: any) {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout