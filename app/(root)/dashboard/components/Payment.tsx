import Card from "@/utils/components/Card/Card"
import { paymentInfos } from "../data"
import { CircleAlert, CircleCheck, CircleCheckBig, CircleCheckBigIcon, Lock, TriangleAlert } from "lucide-react"

const Payment = () => {
  const {amount, fee, status, deadline} =paymentInfos
  return (
    <div className="" >
       <div className="my-5">
          <h2 className="text-gray-400 text-lg">PAYMENT & ESCROW</h2>
      </div> 
      <div className="">
        <Card classname="w-100 px-7 bg-white">

          <h2 className="font-bold my-3">Financial summary</h2>

          <div className="flex items-center justify-between my-2">
            <span>Total amount</span>
            <span>{amount},00 €</span>
          </div>

          <div className="flex items-center justify-between my-2">
            <span>Platform fee</span>
            <span>- {fee},00 €</span>
          </div>

          <hr className="my-3" />

          <div className="flex items-center justify-between my-2">
            <span className="font-semibold">Total amount engaged</span>
            <span className="text-xl font-bold text-green-600">{amount - fee},00 €</span>
          </div>

          <div className="rounded-lg border-[0.5px] border-gray-300 p-4 my-5">
              {
                status === 'locked' && 
                <div className="flex gap-3">
                    <div><Lock className="text-purple-600" width={19}/></div>
                    <div>
                      <p className="font-semibold text-purple-600">Funds locked</p>
                      <p>Funds are secure and will be free once each milestone has been validated.</p>
                    </div>
                </div>
              }
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <CircleAlert width={18}/>
            <p>Validation deadline: {deadline}.</p>
          </div>
        </Card>

        <Card classname="w-100 bg-white my-3">
          <h2 className="font-bold my-3">Actions</h2>

          <div className="flex gap-3 rounded-lg p-3 my-4 bg-gray-300">
            <CircleAlert width={25} />
            <p>Funds will be free once each milostone has been covered and validated.</p>
          </div> 

          <div className="flex items-center justify-between border-[0.3px] border-red-300 rounded-lg p-4">
              <p className="font-semibold text-red-600">Open a dispute</p>
              <TriangleAlert stroke="red"  width={25} />
          </div>
        </Card>

        <Card classname="bg-white w-100 my-3">
           <h2 className="font-bold my-2">Conditions of release</h2>

            <ul>
              {
                [
                  'Funds received on escrow',
                  'All milestones validated',
                  'No pending dispute',
                  'Validation deadline respected.'
                ].map((text, index)=> <li className="flex items-center gap-2 my-1" key={index}>
                  <CircleCheckBig stroke={index!== 1 ? 'green' : 'gray'} strokeWidth={3} width={19}/>
                  <span className={index !==1 ? '' : 'text-gray-400'}>{text}.</span>
                </li>)
              }
            </ul>

            <small className="text-gray-400 text-[0.9rem]">Funds are locked untill all the conditions above have been checked.</small>
        </Card>
      </div>
        
    </div>
  )
}

export default Payment