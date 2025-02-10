import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function MerchantInfo() {
    const merchantInfo = useSelector(state => state.merchant.merchantInfo)
    if(!merchantInfo) return <Skeleton count={2} />
    return (
        <div className='my-6 py-1 flex flex-col gap-2'>
            <h2 className=" font-semibold">{merchantInfo?.name}</h2>
            <div className='flex gap-2 items-center'>
                <FontAwesomeIcon className=' text-button-check' icon={faLocationDot} size='sm' />
                <span className='text-sm font-medium'>{merchantInfo?.address}</span>
            </div>
        </div>
    );
}

export default MerchantInfo;