"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { ArrowLeft, Check } from 'lucide-react';

export const StepperContext = React.createContext<StepperContextProps | undefined>(undefined);

export type StepperContextProps = {
    activeStep: number,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>,
    levelSlider?: number,
    setLevelSlider?: React.Dispatch<React.SetStateAction<number>>
}

export const useStepperContext = () => {
      const context = React.useContext(StepperContext);
      if(context === undefined)
        throw 'Context missing for stepper!';
      
      return context;
}

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
      <div >
        <div className='flex items-center gap-5'>
          <div onClick={()=> {
            if(activeStep > 0)
              handleBack();
          }} className='rounded-full p-2.5 border-[0.5px] border-gray-300 text-gray-400 cursor-pointer hover:bg-gray-100 hover:scale-95 duration-300'><ArrowLeft/></div>
          <Stepper activeStep={activeStep}  connector={<hr className='border-gray-300 border-[0.5px] w-17 ml-4 mr-12'/>} style={{margin:'auto', minWidth: 'max-content', width: '100%'}}>
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
                <Step key={label} {...stepProps} >
                  <StepLabel {...labelProps}  icon={ activeStep > index ? <div className='rounded-full p-2 bg-(--sb-blue-250)'><Check stroke='white'/></div>  : <div className={ 'border-2 border-(--sb-blue-250) text-(--sb-blue-250) rounded-full w-full px-3.5 py-1.5'}>{index + 1}</div> } ><span style={{color: activeStep > index ? 'var(--sb-blue-250)' : 'black'}} className='text-[15px] min-w-max'>{label}</span></StepLabel>
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