import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { apiMerchantInfo } from '../../api'
function MerchantInfo() {
    const [merchantInfo,setMerchantInfo] = useState({})
    useEffect(() => {
        async function fetchData() {
            await apiMerchantInfo().then(res => {
                setMerchantInfo(res.data)
            })
        }
        fetchData();
    },[])
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