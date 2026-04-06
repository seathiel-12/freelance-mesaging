'use client'

import { slideIntoView } from "@/utils/functions/animations"
import { Option } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const OpenConvButton = ()=>{
  const [conversationBar, setConversationBar] = useState<HTMLElement | null>(null);
  const pathname = usePathname();
  useEffect(()=>{
    setConversationBar(document.getElementById('conversationBar')
  )}, [slideIntoView, conversationBar, pathname])

  return <button onClick={()=>{
              if(conversationBar)
              slideIntoView(conversationBar)}
            } className='w-max p-2 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300'
          >
              <Option width={19}/>
          </button>
}

