import React from 'react'
import SidearYT from './SidearYT'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {

    const location = useLocation()

    const unAuthenticatedPath = ['/', '/login', '/register'];

    const shouldHideLayout = unAuthenticatedPath.includes(location.pathname)

    
  return (
    <div className='w-full h-auto'>
        {/* <Header /> */}
        {!shouldHideLayout && <Header />}
    
        <section className='grid grid-cols-5 '>
          <div className='col-start-1 col-end-2'>
          {!shouldHideLayout && <SidearYT />} 
            {/* <SidearYT /> */}
          </div>

          <div className='col-span-4'>
            <Outlet/>
          </div>
        </section>
      </div>

    // <div className="app-layout">
    //   {!shouldHideLayout && <SidearYT />} {/* Only show Sidebar if layout is not hidden */}
    //   <div className="main-content">
    //     {!shouldHideLayout && <Header />} {/* Only show SearchBar if layout is not hidden */}
    //     <Outlet /> {/* Render the page content here */}
    //   </div>
    // </div>
  )
}

export default Layout