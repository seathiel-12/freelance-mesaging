import LinearStepper, { step, stepperProps } from '@/utils/Stepper/Stepper'

const steps:step[] = [
    {
      label: 'a',
      render: ()=> <div>hello</div>,
      onNext:()=>{},
      onBack:()=>{}
    },
    {
      label: 'n',
      render: ()=> <div>hello</div>,
      onNext:()=>{},
      onBack:()=>{}
    },
    {
      label: 'c',
      render: ()=> <div>hello</div>,
      onNext:()=>{},
      onBack:()=>{}
    }
]

const Timeline = () => {
  return (
    <div>
        <p className='text-xl text-gray-400'>Timeline & Jalons</p>

        <div>
            <LinearStepper steps={steps}/>
        </div>
    </div>
  )
}

export default Timeline