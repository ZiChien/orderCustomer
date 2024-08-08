import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartContent from './CartContent.jsx'
import PriceList from './PriceList.jsx'
import Tableware from './Tableware.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

export default function Cart() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.value)
    const merchantInfo = useSelector(state => state.merchant.merchantInfo)

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/order', { replace: true })
        }
    }, [cart])

    const handleClick = () => {
        navigate('/order', { replace: true })
    }

    const [priceList, setPriceList] = useState([])
    const totalPrice = priceList.reduce((acc, item) => acc + item.price, 0)
    
    const tableware = useSelector(state => state.order.tableware)
    const [isNeedTableware, setIsNeedTableware] = useState(tableware)
    return (
        <div className=''>
            <Navbar title={'購物車'} merchantName={merchantInfo.name} handleClick={handleClick} />
            <div className='pb-[112px]'>
                <CartContent />
                <PriceList priceList={priceList} setPriceList={setPriceList} />
                <ButtonToCheck totalPrice={totalPrice} />
                <Tableware isNeedTableware={isNeedTableware} setIsNeedTableware={setIsNeedTableware} />
            </div>
        </div>
    )
}

function ButtonToCheck({ totalPrice }) {
    const navagate = useNavigate();
    const handleClick = () => {
        navagate('/check', { replace: true })
    }
    return (
        <div className='  fixed bottom-0 z-30 left-0 w-full p-4'>
            <div className=' bg-light-bg-theme rounded-lg'>
                <div className='px-4 py-2 flex justify-between items-center gap-1 text-base font-bold'>
                    總支付費用:
                    <span className=''>
                        <FontAwesomeIcon icon={faDollarSign} size='sm' className='px-1' />
                        {totalPrice}
                    </span>
                </div>
                <button onClick={handleClick} className='w-full font-semibold bg-button-check rounded-lg p-2 text-white'>查看取餐時間</button>
            </div>
        </div>
    )
}