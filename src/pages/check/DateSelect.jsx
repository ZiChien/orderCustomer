import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setPickUpDate } from "../../store/orderSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useQuery, gql } from "@apollo/client";
import DateSelectModal from "./DateSelectModal";
import { useTransition, animated } from '@react-spring/web';
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);



export default function DateSelect() {
    const dispatch = useDispatch();
    const pickUpDate = useSelector(state => state.order.pickUpDate);
    
    const pickUpDate_Format = pickUpDate ? `${dayjs(pickUpDate).isToday() ? '(今天)' : ''} ${dayjs(pickUpDate).format('MM/DD')}` : '商家已關閉'
    const [isShowDateSelect, setIsShowDateSelect] = useState(false)
    const dateRef = useRef(null)
    const dateBtnRef = useRef(null)

    const merchantId = useSelector(state => state.merchant.merchantInfo?.id)
    const GET_AVAILABLE_DATE = gql`
        query Query($merchantId: ID!) {
            getAvailableDate(merchantId: $merchantId)
        }
    `
    const { data, error } = useQuery(GET_AVAILABLE_DATE, {
        variables: { merchantId },
        skip: !merchantId
    })
    const availableDate = data?.getAvailableDate
    useEffect(() => {
        if (error) throw new Response(error, { status: 404 });
        if (data && availableDate.length) {
            dispatch(setPickUpDate(availableDate[0]))
        }else{
            dispatch(setPickUpDate(''))
        }
    }, [data, error, availableDate, dispatch])
    useEffect(() => {
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
            <button onClick={handleShowDateSelect} ref={dateBtnRef} className={clsx('w-full p-2 px-4 border-light-bg-theme bg-light-bg-theme rounded-lg border-2 shadow-inner font-semibold flex justify-between', {
                ' !border-button-check-border': isShowDateSelect
            })}>
                <span className="text-sm">{pickUpDate_Format}</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {
                dateTransition((style, isShowDateSelect) => {
                    return (
                        isShowDateSelect &&
                        <animated.div ref={dateRef} style={style} className='absolute top-12 left-0 w-full'>
                            <DateSelectModal availableDate={availableDate} setIsShowDateSelect={setIsShowDateSelect} />
                        </animated.div>
                    )
                })
            }
        </div>
    )
}