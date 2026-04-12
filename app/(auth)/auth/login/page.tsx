'use client'
import { Lock, Mail } from 'lucide-react'
import  Link  from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { LoginSchema, type LoginProps } from '../../type';
import {zodResolver} from '@hookform/resolvers/zod';
import Button from '@/utils/components/Button/Button';
import TextField from '@/utils/components/TextField/TextField';
import Image from 'next/image';
import { asyncFetch } from '@/utils/functions/asyncFetch';
import { useLogin } from '../hooks/useLogin';
import { User } from '@/api/database/types';
import useNotificationManager from '@/utils/components/Notification/hooks/useNotificationManager';
import { redirect } from 'next/navigation';


function LoginForm() {
    const {login} = useLogin();
    const {notify} = useNotificationManager();
    const emailProps = {
        type: 'email',
        label: 'Email',
        placeholder: 'traveler@example.com',
        Icon: Mail
    }

    const passwordProps = {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        Icon: Lock,
    }
    const {handleSubmit, control} = useForm<LoginProps>({
        mode: 'onChange',
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = async (loginData: LoginProps)=> {
        const data: User = await asyncFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, 'POST', loginData);
        console.log(data);
        if(!data){
            notify('Email or password invalid', 'error');
            return;
        }
       
        login(data);
        redirect('/dashboard')
        
    } 
  return (
    <form onSubmit={handleSubmit(onSubmit, (err)=>console.log(err))} className='m-auto rounded-2xl mt-5 bg-white shadow-lg p-8'>
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <p className='text-sm mt-4 text-gray-500'>Sign in to your account to manage your bookings</p>
        <Controller 
            control={control}
            name='email'
            render={({field, fieldState: {error}})=> <TextField value={field.value} errorMessage={error?.message ?? ''} {...emailProps} onChange={field.onChange} /> }
        />
        
        <div>
         <Controller 
            control={control}
            name='password'
            render={({field, fieldState: {error}})=> <TextField errorMessage={error?.message ?? ''} {...passwordProps} value={field.value} onChange={field.onChange} /> }
        />
            
            <Link href={'/forgot-password'} className='w-max text-sm flex justify-self-end mt-3 text-(--sb-blue-300) cursor-pointer'>Forgot password ?</Link>
        </div>

        <Button type='submit' className='bg-foreground text-white w-full mt-4 py-1.5 rounded-lg' textContent='Sign In' />

        <div className='flex items-center gap-2 w-full mt-3 justify-center text-sm text-gray-500'>
            <hr className='w-[30%] border-gray-500 border-[1.25px]' />
            <p>or continue with</p>
            <hr className='w-[30%] border-gray-500 border-[1.25px]' />
        </div>

        <div className='flex gap-2 text-center mt-3 '>
            <button className='flex items-center justify-center gap-2 w-[49%] rounded-xl border border-gray-300 py-1.25'>
                <Image src='/google-logo.svg' width={19} height={19} alt="google logo" />
                <span>Google</span> 
            </button>
            <button className='flex items-center justify-center gap-2 w-[49%] rounded-xl border border-gray-300 py-1.25'>
                <Image width={19} height={19} src='/apple-logo.svg' alt="apple logo" />
                <span>Apple</span>
            </button>
        </div>
    </form>
  )
}

export default LoginForm;