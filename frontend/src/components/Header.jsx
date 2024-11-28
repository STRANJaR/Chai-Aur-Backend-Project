import React from 'react'
import { useForm } from 'react-hook-form'


const Header = () => {

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
        <div className='bg-gray-950 text-white h-14'>
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
                        <button className=''>search</button>
                    </form>
                </div>
                <div>
                    <div className='flex justify-between items-center gap-3'>

                        <p>upload</p>
                        <p>notification</p>
                        <p>profile</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Header