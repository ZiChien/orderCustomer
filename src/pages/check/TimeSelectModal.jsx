import clsx from "clsx";
import dayjs from "dayjs";

import { useDispatch } from "react-redux";
import { setPickUpTime } from "../../store/orderSlice";

export default function TimeSelectModal({ availableTime, setIsShowTimeSelect }) {
    
    const dispatch = useDispatch();
    const timeList = availableTime.map((item, index) => {
        const format = dayjs(item).format('HH:mm')
        return (
            <div onClick={() => handleSetPickUpTime(item)} key={item} className={clsx('flex justify-start px-4 py-3')}>
                <span className="text-sm font-semibold">{format}</span>
            </div>
        )
    })
    const handleSetPickUpTime = (time) => {
        dispatch(setPickUpTime(time))
        setIsShowTimeSelect(false)
    }
    return (
        <div className=" max-h-[170px] overflow-y-auto bg-light-bg-theme rounded-lg shadow-inner divide-y-2 divide-light-bg">
            {timeList}
        </div>
    )
}