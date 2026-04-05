import React, { useState, type FC, type ReactNode } from 'react'

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



const StepperProvider:FC<{children: ReactNode}> = ({children}) => {
    const [activeStep, setActiveStep] = useState(1);
    const [levelSlider, setLevelSlider] = useState(0); 
    const context =  {
    activeStep, setActiveStep, levelSlider, setLevelSlider 
  }
  return (
    <StepperContext.Provider value={context}>
        {children}
    </StepperContext.Provider>
  )
}

export default StepperProvider