import React, { useEffect, useState } from 'react'
import { toast , ToastContainer } from 'react-toastify'
import Button from './Button'
import axios from 'axios';

const AddTask = ({show , setShow , update , setUpdate , currentTask }) => {

  const [text, setText] = useState({
    text: '',
  });

  useEffect(()=> update ? setText({text: currentTask.title}) : setText({ text: '' }), [show]);

  //---------- Add Task Logic ----------//
  const AddTask = async (e)=>{
    e.preventDefault();

    let res = await axios.post("http://localhost:8000/api/task/add" , text , { withCredentials: true});
    (res.data.success) ? toast.success(res.data.msg) : toast.error(res.data.msg)
    console.log(res.data)
    setText({ text: '', });
    setShow(false);
    
  }

  //---------- Edit Task Logic ---------//
  const EditTask = async (e)=>{
      e.preventDefault();
  
      try {
          let res = await axios.put(`http://localhost:8000/api/task/${currentTask._id}/update` , text , { withCredentials: true });
          (res.data.success) ? toast.success(res.data.msg) : toast.error(res.data.msg)
      } catch (error) {
        toast.error('Server Error'); 
      }
      setText({ text: '', });
      setUpdate(false);
      setShow(false);
  }

  return (
    <div className="bg-blend-color-burn">
      <form className={`${ show ? 'flex' : 'hidden' } shadow-lg absolute top-16 left-[50%] translate-x-[-50%] transition-all duration-300 ease-in-out w-[65%] px-5 flex-col gap-5 bg-slate-200`}>
        <span onClick={()=> setShow(false)} className="text-4xl flex justify-end cursor-pointer">&times;</span>
        <textarea onChange={(e)=> setText({ text: e.target.value})} name='task' value={text.text} type="text" className=" w-full min-h-40 p-3 text-xl font-bold" />
        <span onClick={ update ? EditTask : AddTask } className='w-[25%] mb-4 font-bold self-center' ><Button text={`${update ? 'Update' : 'Add' }`} style={'w-full'} /></span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AddTask
