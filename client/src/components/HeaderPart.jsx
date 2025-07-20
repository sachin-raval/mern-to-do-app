import React from 'react'
import { Link } from 'react-router-dom'

const HeaderPart = () => {
  return (
    <div className="h-20 flex justify-center items-center shadow-md">
        <div className="flex justify-center items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="w-[10%] lucide lucide-notepad-text-icon lucide-notepad-text"><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>
          <Link to='/' ><h1 className="text-4xl font-bold">To Do List</h1></Link>
        </div>
    </div>
  )
}

export default HeaderPart