import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartContent from './CartContent.jsx'
import PriceList from './PriceList.jsx'
import Tableware from './Tableware.jsx'
import Remark from './Remark.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faXmark } from '@fortawesome/free-solid-svg-icons'


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

    return (
        <>
            <Navbar title={'購物車'} merchantName={merchantInfo.name} handleClick={handleClick} icon={<FontAwesomeIcon icon={faXmark} size='xl' />} />
            <div className='pb-[112px]'>
                <CartContent />
                <div className='px-4'>
                    <PriceList />
                </div>
                <ButtonToCheck />
                <Tableware />
                <Remark />
            </div>
        </>
    )
}

function ButtonToCheck() {
    const priceList = useSelector(state => state.cart.priceList)
    const totalPrice = priceList.reduce((acc, item) => acc + item.price, 0)
    console.log(totalPrice);
    const navagate = useNavigate();
    const handleClick = () => {
        navagate('/check', { replace: true })
    }
    return (
        <div className='  fixed bottom-0 z-30 left-0 w-full p-4'>
            <div className=' bg-light-bg-theme rounded-lg'>
                <div className='px-4 py-2 flex justify-between items-center gap-1 text-sm font-medium'>
                    應付金額:
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