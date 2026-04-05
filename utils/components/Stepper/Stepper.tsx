"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { ArrowLeft, Check } from 'lucide-react';
import { useStepperContext } from './StepperProvider';
import './Stepper.css'


export type step = {
  label: string,
  render: ()=> React.ReactNode,
  onNext: ()=> void,
  onBack: ()=> void,
}

export type stepperProps = {
  steps : step[],
}
const LinearStepper: React.FC<stepperProps> = ( {steps} ) => {
  const {activeStep, setActiveStep} = useStepperContext();
  const [previousStep, setPreviousStep] = React.useState(0);

  React.useEffect(()=> {
    if(activeStep > previousStep){
      setPreviousStep((prev)=> prev + 1)
    }
  }, [activeStep, previousStep])
  
  const isStepOptional = (step: number) => {
    return step === -1;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setPreviousStep((prev)=> prev - 1)
  };
 

  return (
    <Box>
      <div className='max-w-full' >
        <div className='flex items-center gap-5'>
        {/* <div onClick={()=> {
          if(activeStep > 0)
            handleBack();
        }} className='rounded-full p-1.5 border-[0.5px] border-gray-300 text-gray-400 cursor-pointer hover:bg-gray-100 hover:scale-95 duration-300'><ArrowLeft/></div> */}
          <Stepper activeStep={activeStep}  connector={<hr className='border-gray-300 border-[0.5px] w-7 mx-1'/>} style={{margin:'auto', minWidth: 'max-content', width: '100%'}}>
            {[...steps].map(( {label} , index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel className='flex flex-col justify-center items-center text-center gap-1' {...labelProps}  
                      icon={ activeStep > index ? <div className='rounded-full px-2 py-1 bg-black'><Check stroke='white' width={15}/></div>  : <div className={ 'border border-gray-400 text-(--sb-blue-250) rounded-full w-full flex justify-center ' + (index === activeStep ? 'bg-black px-3 py-1 text-white font-semibold' : ' px-2.5 py-0.5')} >{index + 1}</div> } 
                  >
                    <span style={{color: activeStep > index ? 'var(--sb-blue-250)' : 'black'}} className='text-[15px] min-w-max text-center'>{label}</span>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>
      
        {steps[activeStep].render()}
        
    </Box>
  );
}

export default LinearStepper;