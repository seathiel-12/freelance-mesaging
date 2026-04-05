'use client';
import Surronder from '@/utils/components/Surrounder/Surrounder'
import React, { useEffect } from 'react'
import { useLogin } from '../(auth)/auth/hooks/useLogin';

const layout:React.FC<{children:React.ReactNode}> = ({children}) => {
  const { checkAuth } = useLogin();
  useEffect(() => {
    checkAuth();
    }, []);
  return (
    <Surronder>
        {children}
    </Surronder>
  )
}

export default layout