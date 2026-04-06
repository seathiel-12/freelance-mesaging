'use client';
import Surronder from '@/utils/components/Surrounder/Surrounder'
import React, { useEffect } from 'react'
import { useLogin } from '../(auth)/auth/hooks/useLogin';
import NotificationProvider from '@/utils/components/Notification/NotificationProvider';
import NotificationContainer from '@/utils/components/Notification/NotificationContainer';

const layout:React.FC<{children:React.ReactNode}> = ({children}) => {
  const { checkAuth } = useLogin();
  useEffect(() => {
    checkAuth();
    }, []);
  return (
    <NotificationProvider>
        <Surronder>
          {children}
        </Surronder>
        <NotificationContainer/>
    </NotificationProvider>
      

    
  )
}

export default layout