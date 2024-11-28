import React from 'react'
import { useForm } from 'react-hook-form'

import { useTheme } from '../components/theme-provider'
import { ArrowUp, CircleUser, LucideBell, Moon, Sun, Video } from 'lucide-react'

const Header = () => {


    const { setTheme, theme } = useTheme()
    const dark = theme === 'dark'

    const { register, handleSubmit, watch, } = useForm();

    const searchField = watch('yt-search')

    const handleSearch = () => {
        return;
    }

    React.useEffect(() => {
        const { unsubscribe } = watch((value) => {
            console.log(value)
        })
        return () => unsubscribe()
    }, [watch])
    return (
        <div className='shadow-sm border-b-2 h-18'>
            <div className='flex justify-between p-3'>

                <div>
                    <img className='' src="./yt-logo.svg" alt="youtube logo" />
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleSearch)}>
                        <input
                            type='text'
                            className='min-w-96 px-6 py-2 bg-transparent border border-gray-700   rounded-full'
                            placeholder='Search'
                            defaultValue={''}
                            onChange={searchField}
                            {...register('yt-search')}
                        />
                       
                    </form>
                </div>
                <div>
                    <div className='flex justify-between items-center gap-3'>

                        <div 
                        className={`hover:bg-slate-900 hover:transition-all p-2 rounded-full flex items-center cursor-pointer transition-transform duration-500
                            ${dark ? 'rotate-180': 'rotate-0'}`
                        }
                        onClick={()=> setTheme(theme === 'dark'? 'light': 'dark')}>
                            {dark ?  <Sun className='h-5 w-5 text-yellow-500 rotate-0 transition-all'/>
                            : 
                            <Moon className='h-5 w-5 text-blue-500 rotate-0 transition-all' />
                            }
                           
                        </div>
                        <div className='hover:bg-slate-900 transition-colors cursor-pointer p-2 rounded-full'>
                            <Video className='h-5 w-5 text-gray-300 '/>
                        </div>
                        <div className='hover:bg-slate-900 transition-colors  cursor-pointer p-2 rounded-full'>
                            <LucideBell className='h-5 w-5 text-gray-300 '/>
                        </div>
                        <div className='hover:bg-slate-900 transition-colors  cursor-pointer p-2 rounded-full'>
                            <CircleUser className='h-5 w-5 text-gray-300 '/>
                        </div>
                        
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Header