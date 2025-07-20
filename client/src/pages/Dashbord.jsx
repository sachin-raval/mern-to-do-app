import React, { useEffect, useState } from 'react'
import AddTask from '../components/AddTask'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashbord = () => {

    const [allTask, setAllTask] = useState([]);
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);
    const [currentTask, setCurrentTask] = useState({});

    let navigate = useNavigate();
    let { login } = AuthContext();

    const GetTasks = async ()=>{
        let res = await axios.get("http://localhost:8000/api/task/read" , { withCredentials: true });
        if(res.data.success){
        setAllTask(res.data.tasks);
        console.log('output of getTask' , res.data)
        } 
    }

    useEffect( ()=>{ !login ? navigate('/') : '' });
    useEffect(()=> { GetTasks() } , [show]);

    // -------- ALL TASKS --------- //
    let taskList = allTask.map((v , i)=>{
        return(
            <TaskInfo key={i} value={v} index={i} allTask={allTask} setAllTask={setAllTask} setShow={setShow} setUpdate={setUpdate} setCurrentTask={setCurrentTask} />
        )               
    })


    return (
        <div className="max-w-7xl m-auto">
            <div className="relative px-5">
                <span onClick={()=> setShow(true)} className='max-w-[150px] mt-5 mb-10 p-[4px_10px] flex items-center gap-2 border cursor-pointer text-white bg-[#000]'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg> New Task</span>
                <AddTask show={show} setShow={setShow} update={update} setUpdate={setUpdate} currentTask={currentTask} />
            </div>
            <div className="my-10 flex flex-col items-center gap-5">
                { taskList }
            </div>
        </div>
    );
}

export default Dashbord


//---- Task Info Component ----//
const TaskInfo = ( { value , allTask , setAllTask , setShow , setUpdate , setCurrentTask } )=>{

    const EditForm = (e)=>{
        e.preventDefault();
        setShow(true);
        setUpdate(true);
        let currentTask = allTask.find( v => v._id == value._id );
        return setCurrentTask(currentTask);
    }

    //----------- Task Completed Logic ----------//
    const DoneTask = async ()=>{
        try {
            let completedTask = allTask.find((v , i)=> v._id == value._id);
            
            let res = await axios.patch(`http://localhost:8000/api/task/${completedTask._id}/done` , {} , { withCredentials: true });
            setAllTask(prev => prev.map(t => t._id === completedTask._id ? { ...t, completed: !t.completed } : t ));

        } catch (error) {
            toast.error('Server Error')
        }
    } 

    //---------- Delete Task Logic ----------//
    const DeleteTask = async ()=>{
        let currentTask = allTask.find( v => v._id == value._id );

        let res = await axios.delete(`http://localhost:8000/api/task/${currentTask._id}/delete` , { withCredentials: true });
        setAllTask( prev => prev.filter( v => v._id !== value._id ));
    }

    return(
        <div className="w-[90%] p-4 flex justify-between bg-slate-400">
            <p className={`${ value.completed ? 'line-through' : ''} text-[18px] smd:text-xl sm:text-2xl`}>{value.title}</p>
            {
                value.completed ?
                <p onClick={DoneTask} className="text-4xl cursor-pointer">&times;</p> :

                <div className="flex gap-2">
                    <button onClick={EditForm} className="w-[35%] h-8 px-2 py-1 font-semibold text-white bg-black">Edit</button>
                    <button onClick={DoneTask} className="w-[35%] h-8 px-2 py-1 font-semibold bg-green-500">Done</button>
                    <button onClick={DeleteTask} className="w-[35%] h-8 px-2 py-1 font-semibold bg-red-600">Delete</button>
                </div>
            }
        </div>
    )
}


    
