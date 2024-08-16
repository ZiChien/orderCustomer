import { } from 'react';

function Navbar({ title, merchantName, handleClick, icon  }) {
    return (
        <div className=' sticky top-0 z-20 w-full flex items-center p-2 py-1 gap-4 border-b-2 bg-light-bg-theme rounded-b-lg'>
            <button onClick={handleClick} className='p-2'>
                <div className='w-[30px] h-[30px] flex justify-center items-center'>
                    {icon}
                </div>
            </button>
            <div className='flex flex-col pr-2'>
                <h5 className=' font-semibold'>{title}</h5>
                <span className=' text-xs font-medium'>{merchantName}</span>
            </div>
        </div>
    )
}

export default Navbar;