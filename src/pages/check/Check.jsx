import Navbar from '../../components/Navbar.jsx'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Method from './Method.jsx'
import CustomerInfo from './CustomerInfo.jsx'
import PickUp from './PickUp.jsx'

export default function Check() {
    const merchantInfo = useSelector(state => state.merchant.merchantInfo)
    const navigate = useNavigate();
    return (
        <>
            <Navbar title={'確認訂單'} merchantName={merchantInfo.name} icon={<FontAwesomeIcon icon={faArrowLeft} size='lg' />} handleClick={() => navigate('/cart', { replace: true })} />
            <div className='px-4 py-4 flex flex-col gap-8'>
                <div className=''>
                    <h5 className="font-bold mb-1">取餐資訊</h5>
                    <div className='px-3 flex flex-col gap-2'>
                        <Method />
                        <PickUp />
                    </div>
                </div>
                <div className=''>
                    <CustomerInfo />
                </div>
            </div>
        </>
    )
}