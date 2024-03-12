import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/Order/SearchOrder'
import Username from '../features/User/userName'

export default function Header() {
  return (
    <header className=' sm:px-6 bg-yellow-500 uppercase px-4 py-3 border-b border-stone-500'>
    
        <Link to="/"    className='tracking-widest'>Fast React Pizza Co.</Link>
        <SearchOrder/>
     <Username/>
    </header>
  )
}
