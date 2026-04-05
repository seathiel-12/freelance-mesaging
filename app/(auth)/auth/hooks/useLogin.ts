import { User } from "@/api/database/types";
import { redirect } from "next/navigation";

export const useLogin= ()=> {
    const login = (data: User)=> {
        try {
            localStorage.setItem('userId', data.id);
            redirect('/dashboard');
            console.log(data.id)
        }catch (error) {
            console.error('Error storing user data:', error);
        }

    }
    function checkAuth(){    
          if(!localStorage.getItem('userId')){
            redirect('/auth/login');
          }
    }
    const logout = ()=>{
        localStorage.removeItem('userId');
        redirect('/auth/login');
    }

    return { login, logout, checkAuth };
}