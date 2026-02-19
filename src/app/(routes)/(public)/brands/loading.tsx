import { LoaderCircle, LoaderCircleIcon, LoaderIcon } from 'lucide-react'
import React from 'react'

export default function loading() {
    return <>

        <div className='h-screen flex flex-col gap-3 justify-center items-center'>

            <h2 className="text-4xl font-bold cursor-pointer flex gap-1">
                <span className="px-3 rounded-lg text-white bg-black">S</span>
                Shopy
            </h2>
            <div className='w-12 h-12 rounded-full border-4 border-r-black animate-spin flex justify-center items-center'>
                <div className='w-6 h-6 rounded-full border-4 border-r-black animate-spin'></div>
            </div>

        </div>



    </>
}
