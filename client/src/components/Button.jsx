import React from 'react'

const Button = ({text , style}) => {
  return (
    <button className={`px-3 py-2 text-xl text-white bg-black ${style}`}>{text}</button>
  )
}

export default Button