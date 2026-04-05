export const slideIntoView=(elem:HTMLElement, reverse:boolean=false)=>{
      elem.animate([
        {transform: "translateX(100%)"},
        {transform: "translateX(0)"}
    ], 
    {
      easing: 'ease-in-out',
      fill: "forwards",
      duration: 700,
      direction: reverse ? 'reverse' : 'normal'
    })
}