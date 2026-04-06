"use client"

import { Option, PanelLeft } from 'lucide-react';
import { ReactNode, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import { useLogin } from '@/app/(auth)/auth/hooks/useLogin';
import { redirect, usePathname } from 'next/navigation';
import { OpenConvButton } from '@/app/(root)/conversation/components/OpenConvButton'; 
const Surronder:React.FC<{children: ReactNode}> = ({children}) => {
    const [isSidebarFull, setIsSidebarFull] = useState(true);
    const pathname = usePathname();
    const {logout} =useLogin();
    
  return (
    <div className='grid grid-cols-[auto_1fr] grid-rows-[60px_1fr] '>
      <Sidebar isFull={isSidebarFull}/>
      <div className='px-5 py-2 border-b border-b-gray-300 h-15 flex items-center justify-between'>
        <div className='rounded-full p-2 cursor-pointer hover:bg-gray-200 w-max ' onClick={()=>setIsSidebarFull(!isSidebarFull)}>
          <PanelLeft width={22}/>
          </div>
          <div className='flex items-center gap-5'>
            <button onClick={()=>{
              logout();
              redirect('/auth/login')
              }} className='font-medium cursor-pointer rounded-full py-2 px-4 shadow-2xs border-gray-300 bg-gray-200 hover:bg-gray-100 duration-200'>Log out</button>
            {(pathname.includes('conversation') || pathname.includes('profil') ) && <OpenConvButton/>}
          </div>
      </div>
      <div className='col-start-2 bg-gray-100 h-full' >
        {children}
      </div>
    </div>
    
  )
}

export default Surronder