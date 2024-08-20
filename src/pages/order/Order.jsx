import { useState } from 'react'
import MerchantInfo from './MerchantInfo'
import Menu from './Menu'
import { useSelector } from 'react-redux'
import { getAmount } from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom'

export default function Order() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
        <div className='p-6 w-full'>
            <MerchantInfo />
            <Menu isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            <ButtonToCart isDialogOpen={isDialogOpen} />
        </div>
    )
}
function ButtonToCart({isDialogOpen}) {
    const navigate = useNavigate();
    const amount = useSelector(getAmount)

    function handleClick() {
        navigate('/:merchant/cart', { replace: true })
    }

    if (amount > 0 && !isDialogOpen) {
        return (
            <div className='fixed bottom-0 left-0 w-full p-4 pt-0'>
                <button onClick={handleClick} className='w-full font-semibold bg-button-check rounded-lg p-2 text-white'>查看購物車（{amount}）</button>
            </div>
        )
    } else {
        return null
    }
}