import { Activity, FolderKanban, Settings, User, Wallet } from 'lucide-react'
import Link from 'next/link'

const onglets = [
    {
        name: 'General',
        Icon: Activity,
        redirectTo: '/dashboard'
    },
    {
        name: 'Projects',
        Icon: FolderKanban,
        redirectTo: '/projects'
    },
    {
        name: 'Profil',
        Icon: User,
        redirectTo: ''
    },
    {
        name: 'Wallet',
        Icon: Wallet,
        redirectTo: ''
    },
    {
        name: 'Settings',
        Icon: Settings,
        redirectTo: ''
    }
]

const Sidebar: React.FC<{isFull:boolean}> = ({isFull}) => {
  return (
    <aside className='border-r border-r-gray-300 h-screen py-5 max-w-65'>
        {isFull ? (
            <div className='pl-4 pr-1' aria-label='variant-full'>
                <div className='flex gap-2 items-center mb-3'>
                    <p className='font-semibold rounded-2xl px-4 py-2 bg-foreground text-white'>F</p>
                    <p className='text-foreground'>FreelanceHub</p>
                </div>

                <small className='text-gray-500'>NAVIGATION</small>

                <ul className='my-2'>
                    {onglets.map(({name, Icon, redirectTo}, index)=> <Link key={index} href={redirectTo} className={'w-50 flex items-center gap-2 p-2 rounded-xl hover:bg-gray-200 my-1 ' + (!index ? 'bg-gray-200' : '')}><Icon width={20}/><span>{name}</span></Link>)}
                </ul>
            </div>
        ) : (
            <div aria-label='variant-less' className='px-4'>
                <p className='font-semibold rounded-2xl px-4 py-2 bg-foreground text-white w-max'>F</p>

                <ul className='my-2'>
                    {onglets.map(({name, Icon, redirectTo}, index)=> <div key={index} className='flex items-center justify-center rounded-xl hover:bg-gray-200'><Link className='p-2 w-max' href={redirectTo}><Icon width={20}/></Link></div> )}   
                </ul>
            </div>
        )}
        

        
        
    </aside>
  )
}

export default Sidebar