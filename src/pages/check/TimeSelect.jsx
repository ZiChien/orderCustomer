import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setPickUpTime } from "../../store/orderSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import TimeSelectModal from "./TimeSelectModal";
import { useTransition, animated } from '@react-spring/web';
import { useQuery, gql } from "@apollo/client";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isToday from "dayjs/plugin/isToday";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isToday);


export default function TimeSelect() {
    const dispatch = useDispatch();
    const pickUpTime = useSelector(state => state.order.pickUpTime);
    const pickUpDate = useSelector(state => state.order.pickUpDate);
    const format = pickUpTime ? dayjs(pickUpTime).format('HH:mm') : '商家已關閉'
    const [isShowTimeSelect, setIsShowTimeSelect] = useState(false)
    const TimeRef = useRef(null)
    const TimeBtnRef = useRef(null)
    const merchantId = useSelector(state => state.merchant.merchantInfo?.id)
    const GET_AVAILABLE_TIME = gql`
        query getAvailableTime($merchantId: ID!, $pickUpDate: String!) {
            getAvailableTime(merchantId: $merchantId, pickUpDate: $pickUpDate)
        }
    `
    const { data, error } = useQuery(GET_AVAILABLE_TIME, {
        variables: {
            merchantId: merchantId,
            pickUpDate: pickUpDate,
        },
        skip: !merchantId || pickUpDate === ''
    })
    useEffect(() => {
        if (pickUpDate === '') dispatch(setPickUpTime(''))
    }, [pickUpDate])
    const availableTime = data ? data.getAvailableTime : []
    useEffect(() => {
        if (error) throw new Response(error, { status: 404 });
        if (data) {
            if (!availableTime.length) dispatch(setPickUpTime(''))
            else if (pickUpTime === '' || availableTime.find((time) => time === pickUpTime) === undefined) {
                dispatch(setPickUpTime(availableTime[0]))
            }

        }

    }, [data, availableTime, dispatch, error])


    useEffect(() => {
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
            <button onClick={handleShowTimeSelect} ref={TimeBtnRef} className={clsx('w-full p-2 px-4 border-light-bg-theme bg-light-bg-theme rounded-lg border-2 shadow-inner font-semibold flex justify-between', {
                ' !border-button-check-border': isShowTimeSelect
            })}>
                <span className="text-sm">{format}</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {
                dateTransition((style, isShowTimeSelect) => {
                    return (
                        isShowTimeSelect &&
                        <animated.div ref={TimeRef} style={style} className='absolute top-12 left-0 w-full'>
                            <TimeSelectModal availableTime={availableTime} setIsShowTimeSelect={setIsShowTimeSelect} />
                        </animated.div>
                    )
                })
            }
        </div>
    )
}