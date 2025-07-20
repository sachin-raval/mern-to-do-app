import React, { useEffect, useState } from 'react'
import AddTask from '../components/AddTask';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/userContext';

const Home = () => {

  let navigate = useNavigate();
  let { login } = AuthContext();

  useEffect(()=> { login ? navigate('/dashbord') : '' })
  return (
    <div className="max-w-7xl m-auto mt-10 p-5">
      <div className="flex">
        <div className="basis-[50%]">
          <img className='w-full' src="/group.jpeg" alt="" />
        </div>
        <div className="basis-[50%] px-10 flex items-center">
          <div>
            <h1 className="text-5xl font-bold">Welcome to ToDo</h1>
            <p className="mt-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis officia voluptatibus odit, amet accusantium sit quas vel?</p>
            <Link to='/signup'><Button text={"Get Started"} style={'w-[25%] mt-5'}/></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home