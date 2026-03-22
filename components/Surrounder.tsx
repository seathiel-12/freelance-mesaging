"use client"

import { PanelLeft } from 'lucide-react';
import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar';

const Surronder:React.FC<{children: ReactNode}> = ({children}) => {
    const [isSidebarFull, setIsSidebarFull] = useState(true);
  return (
    <div className='grid grid-cols-[auto_1fr] grid-rows-[60px_1fr]'>
      <Sidebar isFull={isSidebarFull}/>
      <div className='px-5 py-2 border-b border-b-gray-300 h-max '>
        <div className='rounded-full p-2 cursor-pointer hover:bg-gray-200 w-max' onClick={()=>setIsSidebarFull(!isSidebarFull)}><PanelLeft width={22}/></div>
      </div>
      <div className='col-start-2 p-3' >
        {children}
      </div>
    </div>
    
  )
}

export default Surronder