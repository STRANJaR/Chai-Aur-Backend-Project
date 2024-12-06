import React from 'react'
import SidearYT from './SidearYT'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-full h-auto'>
        <Header />
        <section className='grid grid-cols-5 '>
          <div className='col-start-1 col-end-2'>
            <SidearYT />
          </div>

          <div className='col-span-4'>
            <Outlet/>
          </div>
        </section>
      </div>
  )
}

export default Layout