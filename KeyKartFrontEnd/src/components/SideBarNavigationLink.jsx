import { DashboardIcon } from '@radix-ui/react-icons'
import { RxRows, RxPerson, RxActivityLog, RxPlusCircled, RxSketchLogo } from "react-icons/rx";
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideBarNavigationLink = ({isOpen}) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-4 w-full overflow-clip whitespace-nowrap transition-all duration-300 hover:cursor-pointer'>
      
        <li className='flex gap-1 place-items-center' onClick={()=> navigate("/admin-section")}>
          <DashboardIcon className='size-5 shrink-0'/>
          <p className='px-2'>Dashboard</p>
        </li>
        <li className='flex gap-1 place-items-center' onClick={()=> navigate("/admin-section/")}>
          <RxPlusCircled className='size-5 shrink-0'/>
          <p className='px-2'>Configure Product</p>
        </li>
        <li className='flex gap-1 place-items-center' onClick={()=> navigate("/admin-section/listing/")}>
          <RxRows className='size-5 shrink-0'/>
          <p className='px-2'>Product Listing</p>
        </li>
        <li className='flex gap-1 place-items-center'>
          <RxActivityLog className='size-5 shrink-0'/>
          <p className='px-2'>Activity Logs</p>
        </li>
        <li className='flex gap-1 place-items-center'>
          <RxSketchLogo className='size-5 shrink-0'/>
          <p className='px-2'>Purchases</p>
        </li>
        <li className='flex gap-1 place-items-center'>
          <RxPerson className='size-5 shrink-0'/>
          <p className='px-2'>Team Management</p>
        </li>
    
    </div>
  )
}

export default SideBarNavigationLink