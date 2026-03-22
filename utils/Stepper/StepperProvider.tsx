// import React, { useState, type FC, type ReactNode } from 'react'
// import { StepperContext, useStepperContext } from './useStepperContext'


// const StepperProvider:FC<{children: ReactNode}> = ({children}) => {
//     const [activeStep, setActiveStep] = useState(0);
//     const [levelSlider, setLevelSlider] = useState(0); 
//     const context =  {
//     activeStep, setActiveStep, levelSlider, setLevelSlider 
//   }
//   return (
//     <StepperContext.Provider value={context}>
//         {children}
//     </StepperContext.Provider>
//   )
// }

// export default StepperProvider