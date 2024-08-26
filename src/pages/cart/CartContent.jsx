import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/cartSlice';
import Counter from '../../components/Counter.jsx';
import img1 from '../../assets/item1.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';



export default function CartContent() {
    const cart = useSelector(state => state.cart.value)
    const cartList = cart.map((item) => {
        return (
            <CartCard key={item.id} item={item} />
        )
    })

    const navigate = useNavigate();
    const handleClickBackOrder = () => {
        navigate('../order', { replace: true })
    }

    return (
        <div className='py-4'>
            <div className='divide-y-2 flex flex-col gap-2'>
                {cartList}
            </div>
            <div className='px-4 flex justify-center'><button onClick={handleClickBackOrder} className=' text-sm font-semibold text-button-check p-2'>繼續加點</button></div>
        </div>

    )
}


function CartCard({ item }) {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.value)
    const counterRef = useRef(null)
    const counterControlRef = useRef(null)
    useEffect(() => {
        const handleCloseCounter = (e) => {
            if (counterRef.current && !counterRef.current.contains(e.target) && !counterControlRef.current.contains(e.target)) {
                setIsShowCounter(false);
            }
        }
        document.addEventListener('click', handleCloseCounter)
        return () => {
            document.removeEventListener('click', handleCloseCounter)
        }
    }, [])
    const [isShowCounter, setIsShowCounter] = useState()

    const handleShowCounter = () => {
        setIsShowCounter(!isShowCounter)
    }
    const handleClickMinus = () => {
        if (item.amount === 1) {
            const newCart = cart.filter((cartItem) => cartItem.id !== item.id)
            dispatch(setItem(newCart))
            return
        }
        const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id)
        const newCart = cart.map((cartItem, index) => {
            if (index === itemIndex) {
                return {
                    ...cartItem,
                    amount: cartItem.amount - 1
                }
            }
            return cartItem
        })
        dispatch(setItem(newCart))
    }
    const handleClickPlus = () => {
        const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id)
        const newCart = cart.map((cartItem, index) => {
            if (index === itemIndex) {
                return {
                    ...cartItem,
                    amount: cartItem.amount + 1
                }
            }
            return cartItem
        })
        dispatch(setItem(newCart))
    }

    const transition = useTransition(isShowCounter, {
        from: { x: -10, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        leave: { x: -10, opacity: 0 },
        // config: { duration: 150 },
    })

    const mtls = item.mtl.map((mtl) => mtl.optionDisplayName).join(', ')
    return (
        <div className='relative flex p-2 px-4 gap-4 items-center'>
            <div ref={counterControlRef}>
                <button onClick={handleShowCounter} className='w-[48px] h-[36px] bg-light-bg-theme rounded-lg flex items-center justify-center p-1 px-2 gap-1 border-2'>
                    <span className='text-xs font-semibold'>
                        {item.amount}
                    </span>
                    <div className=''>
                        <FontAwesomeIcon icon={faChevronDown} size='2xs' />
                    </div>
                </button>
                {
                    transition((style, isShowCounter) => {
                        return (
                            isShowCounter && (
                                <animated.div style={style} ref={counterRef} className='h-full absolute top-0 left-16 z-20 flex items-center Counter mx-2'>
                                    <div className=' bg-light-bg-theme rounded-full p-2 Counter border-2'>
                                        <Counter count={item.amount} handleClickPlus={handleClickPlus} handleClickMinus={handleClickMinus} minCount={0} />
                                    </div>
                                </animated.div>
                            )
                        )
                    })
                }
            </div>

            <div className={clsx('flex items-center gap-4 grow', { 'opacity-60': isShowCounter })}>
                <div className='w-[68px] h-[60px]'>
                    <img src={img1} alt="" className='h-full object-cover rounded-lg' />
                </div>
                <div className='flex flex-col'>
                    <span className=' font-medium text-base'>{item.item.productDisplayName}</span>
                    <span className=' font-medium text-xs'>
                        {mtls}
                    </span>
                </div>
                <div className='justify-items-end ml-auto'>
                    <span className=' text-sm font-medium'>${item.item.price * item.amount}</span>
                </div>
            </div>

        </div>
    )
}