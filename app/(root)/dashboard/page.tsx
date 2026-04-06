'use client'
import Informations from './components/Informations'
import Payment from './components/Payment'
import Timeline from './components/Timeline'

const Dashboard = () => {
  
  return (
    <div>
        <div className='grid grid-cols-[28%_28%_28%] gap-10 justify-center overflow-y-scroll h-(--main-height) pb-10 relative'>
            <Timeline/>
            <Payment/>
            <Informations/>
        </div>
    </div>
  )
}

export default Dashboard