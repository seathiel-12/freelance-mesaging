'use client'

import { User as UserType} from "@/app/types";
import { slideIntoView } from "@/utils/functions/animations";
import { asyncFetch } from "@/utils/functions/asyncFetch";
import {  User, X } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const UsersSidebar:React.FC<{redirectPath:string}> = ({redirectPath}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(()=>{
      const userId= JSON.parse(localStorage.getItem('user') as string).id;
      const getConversations = async () => { 
        await asyncFetch(`${process.env.NEXT_PUBLIC_API_URL}/users`).then( (data:UserType[])=> setUsers(data.filter(user=> user.id !== userId)) );
      }
      getConversations();
      if(ref.current)
        slideIntoView(ref.current);
    }, []);

    const handleOnclick = (pathname:string, conversationId:string) => {
        if(ref.current)
          slideIntoView(ref.current, true);
      redirect(`/${pathname}/${conversationId}`);
    }

    return <div 
      className="h-screen fixed z-2 right-0 p-10 pb-0 w-1/4 bg-white top-0 shadow-2xs border-[0.5px] grid grid-rows-[5%_95%] " 
      ref={ref} 
      id="conversationBar"
    >

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Discussions</h1>
            <button onClick={()=>{
              if(ref.current)
                slideIntoView(ref.current, true)
              }} className="rounded-full p-2 bg-gray-200 w-max cursor-pointer hover:bg-gray-300"> <X/> </button>
          </div>

          <div className="mt-5 overflow-y-scroll no-scrollbar" style={users.length ? {display: 'block'} : {display: 'flex', height: '80%'}}>
            
              {users && users.map((user, index)=> (
               <div onClick={()=> handleOnclick(redirectPath, user.id)} key={index} className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-3">

              <div className="rounded-full p-3 w-12 h-12 text-center bg-gray-200 font-bold">  {user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{`${user.firstname} ${user.lastname}`}</p>
                
              </div>
            </div>))}

            {users.length === 0 && <div className="flex items-center flex-col m-auto h-max">
              <div className="p-5 rounded-full bg-gray-200 w-max h-max"><User className="mx-auto" size={50} color="#9ca3af"/></div>
              <p className="text-center text-gray-600 mt-4 font-medium text-xl">No users available.</p>
            </div> }
            
          </div>
        </div>
}
