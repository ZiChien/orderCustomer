import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setPickUpTime } from "../../store/orderSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { apiGetTime } from "../../api";
import TimeSelectModal from "./TimeSelectModal";
import { useTransition, animated } from '@react-spring/web';
import dayjs from "dayjs";



export default function TimeSelect() {
    const dispatch = useDispatch();
    const pickUpTime = useSelector(state => state.order.pickUpTime);
    const format = pickUpTime ? dayjs(pickUpTime).format('HH:mm') : 'Select Time'
    const [time, setTime] = useState('')
    const [isShowTimeSelect, setIsShowTimeSelect] = useState(false)
    const TimeRef = useRef(null)
    const TimeBtnRef = useRef(null)
    const filterTime = time ? time.filter((item) => {
        const OFFSET = 10
        const now = dayjs().add(OFFSET, 'minute')
        const itemTime = dayjs(item).set('year', now.year()).set('month', now.month()).set('date', now.date())
        return itemTime.isAfter(now)
    }) : ''
    useEffect(() => {
        getTime()
        async function getTime() {
            const res = await apiGetTime()
            setTime(res.data.availabletime);
        }

        const handleCloseDateSelect = (e) => {
            if (TimeRef.current && !TimeRef.current.contains(e.target) && !TimeBtnRef.current.contains(e.target)) {
                setIsShowTimeSelect(false);
            }
        }
        document.addEventListener('click', handleCloseDateSelect)
        return () => {
            document.removeEventListener('click', handleCloseDateSelect)
        }
    }, [])
    useEffect(() => {
        if (pickUpTime === '' && filterTime[0]) {
            dispatch(setPickUpTime(filterTime[0]))
        }

    }, [time])
    const dateTransition = useTransition(isShowTimeSelect, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        // config: { duration: 150 },
    })
    const handleShowTimeSelect = () => {
        setIsShowTimeSelect(!isShowTimeSelect)
    }



    return (
        <div className="w-[48%] relative">
            <button onClick={handleShowTimeSelect} ref={TimeBtnRef} className={clsx('w-full p-2 px-4 border-light-bg-theme bg-light-bg-theme rounded-lg border-2 shadow-inner font-semibold flex justify-between',{
                ' !border-button-check-border' : isShowTimeSelect
            })}>
                <span className="text-sm">{format}</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {
                dateTransition((style, isShowTimeSelect) => {
                    return (
                        isShowTimeSelect &&
                        <animated.div ref={TimeRef} style={style} className='absolute top-12 left-0 w-full'>
                            <TimeSelectModal filterTime={filterTime} setIsShowTimeSelect={setIsShowTimeSelect} />
                        </animated.div>
                    )
                })
            }
        </div>
    )
}