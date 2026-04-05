'use client'
import { ReactNode } from "react";
import { UsersSidebar } from "./components/UsersSidebar";

const layout:React.FC<{children: ReactNode}> = ({children}) => {
    
  return (
    <div>
        <UsersSidebar redirectPath="conversation" />
        {children}
    </div>
  )
}

export default layout;

