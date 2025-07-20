import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../context/userContext';

export default function SignUp() {

  let navigate = useNavigate();
  let { login } = AuthContext();

  useEffect(()=> { login ? navigate('/dashbord') : '' })

  const [formData , setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange =(e)=>{
    setFormData( {...formData , [e.target.name] : e.target.value })
  }

  const sendData = async(e)=>{
    e.preventDefault();

    let res = await axios.post('http://localhost:8000/api/user/register' , formData );
    console.log(res.data)
    if(res.data.success) {
      toast.success(res.data.msg)
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    }else{
      toast.error(res.data.msg)
    }
  }
  return (
    <div className="mb-40">
        <div className="my-20 flex items-center">

            {/* Signup Form */}
            <form onSubmit={sendData} className="w-[500px] m-auto flex flex-col items-center gap-4">
                <div className="mb-5 flex justify-center items-center gap-4">
                    <h1 className="font-prata text-5xl">Signup</h1>
                </div>
                <input onChange={handleChange} name='name' value={formData.name} type="text" className="w-full p-2 border border-black" placeholder='Name'/>
                <input onChange={handleChange} name='email' value={formData.email} type="email" className="w-full p-2 border border-black" placeholder='Email'/>
                <input onChange={handleChange} name='password' value={formData.password} type="password" className="w-full p-2 border border-black" placeholder='Password'/>
                <div className="w-full mt-2- flex justify-end">
                    <Link to='/login'>Login Now</Link>
                </div>
                <button className="w-[150px] mt-4 p-2 text-white bg-black">Signup</button>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}
