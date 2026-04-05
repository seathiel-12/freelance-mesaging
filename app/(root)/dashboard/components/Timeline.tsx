'use client'

import LinearStepper, { step, stepperProps } from '@/utils/components/Stepper/Stepper'
import StepperProvider from '@/utils/components/Stepper/StepperProvider'
import { jalons } from '../data'
import { Check, ChevronRight, Clock, Play } from 'lucide-react'
import { useState } from 'react'

const steps:step[] = [
    {
      label: 'Starter',
      render: ()=> <div></div>,
      onNext:()=>{},
      onBack:()=>{}
    },
    {
      label: 'Work',
      render: ()=>{
        const [isDvisible, setIsDvisible] = useState(Array(5).fill(false));

        return (
             <div>
        {jalons.map(({title, hostedby, description, date, status}, index)=> 
        {
            const {Icon, bg, border, stroke}: {Icon: typeof Check, bg:string, border:string, stroke: string} = status === 'Approved' && {
                Icon: Check,
                bg: 'bg-green-success',
                border: 'border-green-500',
                stroke: 'green'
            }  || status === 'Ongoing' && {
                Icon: Play,
                bg: 'bg-blue-ongoing',
                border: 'border-blue-500',
                stroke: 'blue'
            } || {
                Icon: Clock,
                bg: 'bg-white',
                border: '',
                stroke: 'gray'
            };
            
            return (
            <div key={index} onClick={()=>setIsDvisible((prev)=> prev.map((elem, i)=> i===index ? !elem : elem))} className={'my-3 w-100 rounded-2xl py-1 border-[0.5px] shadow-2xs ' + bg + ' ' + border}>
                <div className='flex gap-4 items-center justify-between px-5 py-2'>
                    <div className='flex gap-4 items-center'>
                        <div>
                            <Icon width={19} stroke={stroke} />
                        </div>
                        <div>
                            <p className='font-semibold'>{title}</p>
                            <p><span>{hostedby}</span> • <span>{date}.</span> • <span className={'  font-semibold ' +  (status === 'Approved' ? 'text-green-400' : 'text-gray-400')}>{status}</span></p>
                        </div>
    
                    </div>
                    
                    <div>
                        <ChevronRight strokeWidth={1} className='ml-4'/>
                    </div>
                </div>

                {isDvisible[index] && <p className='py-2 pt-4 border-t-[0.5px] border-t-gray-200 px-5'>{description}</p>}
            </div>
    )} )}
      </div>
        );
      } 
        
      ,
      onNext:()=>{},
      onBack:()=>{}
    },
    {
      label: 'Delivery',
      render: ()=> <div></div>,
      onNext:()=>{},
      onBack:()=>{}
    },
    {
      label: 'Checking',
      render: ()=> <div></div>,
      onNext:()=>{},
      onBack:()=>{}
    },
    {
      label: 'Closure',
      render: ()=> <div></div>,
      onNext:()=>{},
      onBack:()=>{}
    }
]

const Timeline = () => {
  return (
    <div className='max-w-100'>
        <div className='my-5'>
            <h2 className='text-md text-gray-400 text-lg'>TIMELINE & JALONS</h2>
        </div>

        <StepperProvider>
            <LinearStepper steps={steps}/>
        </StepperProvider>
    
    </div>
  )
}

export default Timeline