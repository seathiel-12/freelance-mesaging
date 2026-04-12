  import { ReactNode } from "react"
import { UsersSidebar } from "../conversation/components/UsersSidebar"

const layout:React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <div>
        <UsersSidebar redirectPath="profil" />
        {children}
    </div>
  )
}

export default layout