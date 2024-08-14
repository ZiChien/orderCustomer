import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setPickUpDate } from "../../store/orderSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { apiGetDate } from "../../api";
import DateSelectModal from "./DateSelectModal";
import { useTransition, animated } from '@react-spring/web';
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);



export default function DateSelect() {
    const dispatch = useDispatch();
    const pickUpDate = useSelector(state => state.order.pickUpDate);
    const day = dayjs(pickUpDate)
    const pickUpDate_Format = `${day.isToday() ? '(今天)' : ''} ${day.format('MM/DD')}`

    const [date, setDate] = useState('')
    const [maxDayIndex, setMaxDayIndex] = useState(0)
    const [isShowDateSelect, setIsShowDateSelect] = useState(false)
    const dateRef = useRef(null)
    const dateBtnRef = useRef(null)
    useEffect(() => {
        getDate()
        async function getDate() {
            const res = await apiGetDate()
            setDate(res.data.date);
            setMaxDayIndex(res.data.maxdayindex);
        }

        const handleCloseDateSelect = (e) => {
            if (dateRef.current && !dateRef.current.contains(e.target) && !dateBtnRef.current.contains(e.target)) {
                setIsShowDateSelect(false);
            }
        }
        document.addEventListener('click', handleCloseDateSelect)
        return () => {
            document.removeEventListener('click', handleCloseDateSelect)
        }
    }, [])
    useEffect(() => {
        if (pickUpDate === '' && date) {
            dispatch(setPickUpDate(date.find(item => item.enable).date))
        }
    }, [date])
    const dateTransition = useTransition(isShowDateSelect, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        // config: { duration: 150 },
    })
    const handleShowDateSelect = () => {
        setIsShowDateSelect(!isShowDateSelect)
    }



    return (
        <div className="w-[48%] relative">
            <button onClick={handleShowDateSelect} ref={dateBtnRef} className="w-full p-2 px-4 bg-light-bg-theme rounded-lg border-2 font-semibold border-light-bg-seconds flex justify-between">
                <span className="text-sm">{pickUpDate_Format}</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {
                dateTransition((style, isShowDateSelect) => {
                    return (
                        isShowDateSelect &&
                        <animated.div ref={dateRef} style={style} className='absolute top-12 left-0 w-full'>
                            <DateSelectModal date={date} maxDayIndex={maxDayIndex} setIsShowDateSelect={setIsShowDateSelect} />
                        </animated.div>
                    )
                })
            }
        </div>
    )
}