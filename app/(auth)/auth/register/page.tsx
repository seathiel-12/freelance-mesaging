'use client'
import { Mail, User, Lock } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { RegisterSchema, type RegisterProps } from '../../type';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@/utils/components/TextField/TextField';
import SelectField from '@/utils/components/SelectField/SelectField';
import { asyncFetch } from '@/utils/functions/asyncFetch';
import { redirect } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';

function RegisterForm() {
  const {handleSubmit, control} = useForm<RegisterProps>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
    defaultValues: { status: 'FREELANCE' }
  });
  const {login} = useLogin();
  const onSubmit = async (registerData:RegisterProps)=>{
    
    const data = await asyncFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, 'POST', registerData);
    if(data){
        login(data);
        redirect('/dashboard');
    }   
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (err)=>console.log(err)
    )} className=' m-auto rounded-2xl mt-5 bg-white shadow-lg p-8'>
        <div className='flex items-center justify-between'>
          <h1 className="font-bold text-2xl">Create Account</h1>
          <Controller 
              control={control}
              name='status'
              render={({field})=> <SelectField {...field} options={['FREELANCE', 'ENTERPRISE']} name='status' />  }
            />
          
        </div> 
        <p className="py-3">Join Freelance messaging now!</p>

        <div className="flex items-center gap-5 mt-3">
            <Controller 
              control={control}
              name='firstname'
              render={({field, fieldState:{error}})=> <TextField value={field.value} onChange={field.onChange} errorMessage={field.value && error?.message} label="First name" Icon={User} placeholder="John" />}
            />
            <Controller
              control={control}
              name='lastname'
              render={({field, fieldState: {error}})=> <TextField value={field.value}
             onChange={field.onChange} errorMessage={field.value && error?.message} label="Last name" placeholder="Doe" />}
            />
        </div>

        <Controller 
          control={control}
          name='email'
          render={({field, fieldState: {error}})=> <TextField value={field.value}
             onChange={field.onChange} type='email' errorMessage={field.value && error?.message} label="Email" placeholder="traveler@example.com" Icon={Mail}/>}
        />
        <Controller 
          control={control}
          name='password'
          render={({field, fieldState: {error}})=> <TextField value={field.value}
             onChange={field.onChange} type='password' errorMessage={field.value && error?.message} label="Password" placeholder="Create a password" Icon={Lock}/>}
        />
        <Controller 
          control={control}
          name='confirmPassword'
          render={({field, fieldState: {error}})=> <TextField value={field.value}
             onChange={field.onChange} type='password' errorMessage={field.value && error?.message} label="Confirm Password" placeholder="Re-enter your password" Icon={Lock}/>}
        />

        <div className='mt-3 pl-2'>
            <input type="checkbox" id='agree' required className='scale-120' />
            <label htmlFor="agree" className="text-sm text-gray-600 ml-2">I agree to the <span className="text-(--sb-blue-300) cursor-pointer">Terms of Service</span> and <span className="text-(--sb-blue-300) cursor-pointer">Privacy Policy</span></label>
        </div>

        <button type="submit" className='bg-foreground cursor-pointer text-white w-full mt-4 py-1.5 rounded-lg font-semibold hover:opacity-80 hover:scale-97 duration-200'>Create Account</button>
    </form>
  )
}

export default RegisterForm