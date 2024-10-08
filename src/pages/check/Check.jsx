import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { getMerchantInfo } from '../../store/merchantSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import Method from './Method.jsx'
import CustomerInfo from './CustomerInfo.jsx'
import PickUp from './PickUp.jsx'
import OrderList from './OrderList.jsx'
import clsx from 'clsx'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import dayjs from "dayjs";
import { getAmount } from '../../store/cartSlice.js'
import { useMutation, gql } from '@apollo/client'
import { persistor } from '../../store' // 添加这行

export default function Check() {
    const { merchant } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.value)
    const merchantInfo = useSelector(state => state.merchant.merchantInfo)
    useEffect(() => {
        if (cart.length === 0) {
            navigate('../order', { replace: true })
        }
        dispatch(getMerchantInfo(merchant))
    }, [])
    return (
        <>
            <Navbar title={'確認訂單'} merchantName={merchantInfo?.name} icon={<FontAwesomeIcon icon={faArrowLeft} size='lg' />} handleClick={() => navigate('../cart', { replace: true })} />
            <div className='px-4 py-4 flex flex-col gap-6 pb-[112px]'>
                <div className=''>
                    <h5 className=" text-base font-semibold my-2">取餐資訊</h5>
                    <div className='px-3 flex flex-col gap-2 border-l-4 border-light-bg-seconds'>
                        <Method />
                        <PickUp />
                    </div>
                </div>
                <div className=''>
                    <CustomerInfo />
                </div>
                <div>
                    <OrderList />
                </div>
                <ButtonToPlaceOrder />
            </div>
        </>
    )
}
function ButtonToPlaceOrder() {
    const merchantInfo = useSelector(state => state.merchant.merchantInfo)
    const cart = useSelector(state => state.cart.value)
    const priceList = useSelector(state => state.cart.priceList)
    const totalPrice = priceList.reduce((acc, item) => acc + item.price, 0)
    const customer = useSelector(state => state.order.customer)
    const remark = useSelector(state => state.order.remark)
    const amount = useSelector(getAmount)
    const pickUpDateTime = combineDateTime(useSelector(state => state.order.pickUpDate), useSelector(state => state.order.pickUpTime))
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    function combineDateTime(pickDate, pickTime) {
        if (pickDate === '' || pickTime === '') return ''
        const time = dayjs(pickTime)
        return dayjs(pickDate).set('hour', time.hour()).set('minute', time.minute()).format()
    }
    const [createOrder, { loading, error }] = useMutation(gql`
        mutation CreateOrder($input: OrderInput!) {
            createOrder(input: $input)
        }
    `);
    const handleSubmit = async () => {
        const order = {
            orderID: new Date().getTime(),
            content: cart,
            note: remark,
            customer: {
                name: customer.name,
                phone: customer.phone,
                userId: "",
            },
            priceList: priceList,
            amount,
            isLine: false,
            pickUpDateTime,
            merchantId: merchantInfo.id,
        }
        if (cart.length === 0) return
        if (customer.name === '' || customer.name === undefined) return
        if (pickUpDateTime === '') return
        try {
            await createOrder({ variables: { input: order } })
            persistor.purge()
            navigate('../confirm', { replace: true })

        } catch (error) {
            console.log(error);
        }
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
                <button onClick={handleSubmit} disabled={customer.name === '' || pickUpDateTime === '' || isLoading} className={clsx('w-full flex justify-center font-semibold bg-button-check rounded-lg p-2 text-white', {
                    ' bg-gray-500 opacity-30': customer.name === '' || pickUpDateTime === '' || isLoading,
                })}>
                    <div className='relative'>
                        {
                            isLoading &&
                            <Box sx={{
                                position: 'absolute',
                                left: '-25px',

                            }}>
                                <CircularProgress size={14} sx={{
                                    color: 'white'
                                }} />
                            </Box>
                        }
                        送出訂單
                    </div>
                </button>
            </div>
        </div>
    )
}
