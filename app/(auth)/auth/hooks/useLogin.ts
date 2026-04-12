import { User } from "@/api/database/types";
import { redirect } from "next/navigation";

export const useLogin= ()=> {
    const login = (data: User)=> {
        try {
            localStorage.setItem('user', JSON.stringify(data));
            redirect('/dashboard');
        }catch (error) {
            console.error('Error storing user data:', error);
        }
    }
    function checkAuth(){    
        if(!localStorage.getItem('user')){
            redirect('/auth/login');
        }
    }
    const logout = ()=>{
        localStorage.removeItem('user');
        redirect('/auth/login');
    }

    return { login, logout, checkAuth };
}