import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Button from '../components/Button';
import axios from 'axios';
import { AuthContext } from '../context/userContext';


export default function Login() {

    let navigate = useNavigate();
    let { login , setLogin } = AuthContext();
    
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

        let res = await axios.post('http://localhost:8000/api/user/login' , formData , { withCredentials: true });
        console.log(res.data)
        
        if(res.data.success){
            toast.success(res.data.msg);
            setLogin(true);
            navigate('/dashbord');
            setFormData({
                name: '',
                email: '',
                password: '',
            });
        }else{
            toast.error(res.data.msg);
        }
    }

  return (
    <div className="mb-40">
        <div className="my-20 flex items-center">
    
            {/* Login Form */}
            <form onSubmit={sendData} className="w-[500px] m-auto flex flex-col items-center gap-4">
                <div className="mb-5 flex justify-center items-center gap-4">
                    <h1 className="font-prata text-5xl">Login</h1>
                </div>
                <input onChange={handleChange} name='email' value={formData.email} type="email" className="w-full p-2 border border-black" placeholder='Email'/>
                <input onChange={handleChange} name='password' value={formData.password} type="password" className="w-full p-2 border border-black" placeholder='Password'/>
                <div className="w-full mt-2- flex justify-between">
                    <Link>Forgot your password?</Link>
                    <Link to='/signup'>Create Account</Link>
                </div>
                <Button text={'Login'} style={' mt-5'} />
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}
