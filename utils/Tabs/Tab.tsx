import { useEffect, useRef } from "react";

function Tab( {options, current, onclick}: {options: string[], current?:string, onclick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void} ) {
    const ref = useRef<HTMLDivElement>(null);
    
    const tabFunc = (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        
        if(!e && !current) return;
        
        const selected = e?.currentTarget;  
        let rect = selected?.getBoundingClientRect() ||  document.getElementById(current!)!.getBoundingClientRect();

        if(ref.current){
            ref.current.style.width = `${rect.width}px`;
            ref.current.style.height = `${rect.height}px`;
            ref.current.style.top = `${rect.top + window.scrollY}px`;
            ref.current.style.left = `${rect.left + window.scrollX}px`;
        }
    }

    useEffect(()=>{
        tabFunc();
    }, [current]);

  return (
    <div className='rounded-xl flex p-0.75 bg-gray-100 w-full'>
        {options.map((option) => 
            <button id={option} onClick={(e)=>{
                e.preventDefault();
                tabFunc(e)
                onclick(e);
            }} key={option} className=' py-1.25 transition-all z-2 w-1/2 text-sm min-w-max'>{option}</button>
        )}

        <div ref={ref} className="absolute bg-white shadow-md transition-all duration-500 rounded-lg z-1"></div>
    </div>
  )
}

export default Tab