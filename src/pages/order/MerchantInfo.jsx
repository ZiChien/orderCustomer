import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useDispatch,useSelector } from 'react-redux';
import { getMerchantInfo } from '../../store/merchantSlice';
function MerchantInfo() {
    const merchantInfo = useSelector(state => state.merchant.merchantInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        if(merchantInfo.name === '') dispatch(getMerchantInfo())
    },[dispatch])
    return (
        <div className='my-6 py-1 flex flex-col gap-2'>
            <h2 className=" font-semibold">{merchantInfo.name}</h2>
            <div className='flex gap-2 items-center'>
                <FontAwesomeIcon className=' text-light-decoration' icon={faLocationDot} />
                <span className=' font-semibold'>{merchantInfo.address}</span>
            </div>
        </div>
    );
}

export default MerchantInfo;