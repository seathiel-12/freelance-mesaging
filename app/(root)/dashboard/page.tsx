'use client'
import Informations from './components/Informations'
import Payment from './components/Payment'
import Timeline from './components/Timeline'

const Dashboard = () => {
  
  return (
    <div>
        <div className='flex gap-10 justify-center'>
            <Timeline/>
            <Payment/>
            <Informations/>
        </div>
    </div>
  )
}

export default Dashboard