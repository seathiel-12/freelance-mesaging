'use client'
import { ReactNode } from "react";
import { UsersSidebar } from "./components/UsersSidebar";
import NotificationProvider from "@/utils/components/Notification/NotificationProvider";
import NotificationContainer from "@/utils/components/Notification/NotificationContainer";

const layout:React.FC<{children: ReactNode}> = ({children}) => {
    
  return (
    <div>
      <NotificationProvider>
        <UsersSidebar redirectPath="conversation" />
        {children}
        <NotificationContainer/>
      </NotificationProvider>
    </div>
  )
}

export default layout;

