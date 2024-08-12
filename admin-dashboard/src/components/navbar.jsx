import React from 'react'
import logo from "../assets/argusLogo.png"
import { navLists } from '../constants'

const Navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
        <img src={logo} alt="Apple" width={80} height={30} className='ml-4'/>
        <nav className='flex w-full screen-max-width'>
            <div className='flex flex-1 justify-center max-sm:hidden'>
                {navLists.map((nav)=>(
                    <div key={nav} className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'>
                        {nav}
                    </div>
                ))}
            </div>
        </nav>
    </header>
  )
}

export default Navbar
