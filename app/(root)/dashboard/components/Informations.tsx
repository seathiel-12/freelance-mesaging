import Card from "@/utils/components/Card/Card"
import { files, history, informations, participants } from "../data"
import Link from "next/link";
import { File, LucideLink } from "lucide-react";
import Milestone from "@/utils/components/Milestone/Milestone";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Timeline from "@mui/lab/Timeline";
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const Informations = () => {
    const {missionSummary, criteria, deliverables} = informations;
  return (
    <div className="my-5">
        <h2 className="text-gray-400 text-lg">INFORMATIONS</h2>

        <Card classname="bg-white w-100 my-5 px-7">
            <h3 className="font-bold my-3">Mission Summary</h3>
            <p className="text-gray-500">{missionSummary}</p>

            <p className="my-4 font-bold text-[0.9rem] text-gray-600">EXPECTED DELIVERABLES</p>
            <ul>{deliverables.map((d, index)=> <li className="" key={index}>• {d}</li>)}</ul>

            <p className="my-3 text-[0.9rem] font-bold text-gray-600">ACCEPTATION CRITERIA</p>
            <ul>{criteria.map((c, index)=> <li className="" key={index}>• {c}</li>)}</ul>
            
            <div className="flex gap-5 mt-2">
                <small className="text-gray-400">Start date: {new Date().toLocaleDateString()}</small>
                <small className="text-gray-400">End date: {new Date().toLocaleDateString()}</small>
            </div>
        </Card>

        <Card classname="bg-white">
            <h2 className="font-semibold">Participants</h2>

            {participants.map(({name, profil, title, enterprise}, index)=> 
                <div key={index} className="flex items-center gap-3 my-3 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full p-3 bg-slate-800 w-max text-white font-bold">{profil}</div>
                        <div>
                            <p className="font-semibold">{name}</p>
                            <p className="text-gray-400"><span>{title}</span>{enterprise && <span> • {enterprise}</span>}</p>
                        </div>
                    </div>
                    <Link href={''} className="text-blue-500 hover:underline flex gap-1">Profil <LucideLink width={15}></LucideLink></Link>
                </div>)}
        </Card>

        <Card classname="bg-white my-5">
            <h2 className="font-semibold mb-2">Attached Files</h2>
            <ul>
                {files.map(({filename, type}, index) => <li key={index} className="flex items-center justify-between cursor-pointer rounded-lg p-2 hover:bg-gray-200">
                    <div className="flex items-center gap-2"><File width={19} /><span>{filename}</span></div>
                    <small className="text-gray-500">{type}</small>
                    </li>)}
            </ul>
        </Card>

        <Card classname="bg-white my-5">
            <h2 className="font-semibold">History</h2>
                <Timeline position="right" className="mt-3">
                    {history.map(({title, actor, date}, index)=>  
                        <TimelineItem key={index}>
                            <TimelineOppositeContent className="hidden" />
                            <TimelineSeparator>
                            <TimelineDot className="bg-gray-300" />
                            {index + 1 < history.length && <TimelineConnector className="border-[0.5px]" />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <p>{title}</p>
                                <small className="text-gray-400">{actor} <span> {date}</span></small>
                            </TimelineContent>
                        </TimelineItem>)}
                </Timeline>
        </Card>
    </div>
  )
}

export default Informations