'use client'
import Tab from '@/utils/components/Tabs/Tab';
import Image from 'next/image';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode } from 'react';


const AuthLayout: React.FC<{children:ReactNode}> = ({children}) => {
    const pathname = usePathname();
  
  return (
    <div className='w-screen'>
        <div className='h-screen  m-auto grid grid-cols-[45%_55%]'>
        <div className='bg-beige h-screen m-auto flex w-full'>
          <Image 
            src='/images/cover1.jpg'
            alt='Cover'
            width={500}
            height={600}
            className='m-auto'
          />
        </div>
          
          <div className='w-125 mt-40 m-auto'>
              <Tab options={['Login', 'Register']} onclick={(e)=> {
                  redirect((e.currentTarget.id  === 'Login' ? '/auth/login' : '/auth/register'))
                  }} current={pathname.includes('login') ? 'login' : 'register'} />
                {children}              
          </div>   
      </div>
    </div>
    
  )
}

export default AuthLayout