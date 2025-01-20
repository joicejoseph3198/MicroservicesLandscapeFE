import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight} from "react-icons/fa6";
import {  motion, useAnimationControls } from "motion/react"
import SideBarNavigationLink from './SideBarNavigationLink';


const containerVariants = {
    close:{
        width: "4rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    }, 
    open:{
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        }
    }
}

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerControls = useAnimationControls();

    useEffect(()=>{
        if(isOpen){
            containerControls.start("open")
        }else{
            containerControls.start("close")
        }
    },[isOpen])

    const handleOpenClose = () => {
        setIsOpen(!isOpen);
    }



  return (
    <motion.nav
     variants={containerVariants}
     animate={containerControls}
     initial="close"
     className='flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full min-h-screen shadow shadow-slate-400 bg-white'>
        <div
        className='flex flex-row w-full justify-between place-items-center'>
            <div></div>
            <button onClick={() => handleOpenClose()}>
                {isOpen ? <FaArrowLeft/> : <FaArrowRight/> }
            </button>  
        </div>
        <div className='flex flex-row justify-center items-center'>
                <SideBarNavigationLink/>
        </div>
    </motion.nav>
  )
}

export default SideBar