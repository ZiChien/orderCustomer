import clsx from "clsx";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

import { useDispatch } from "react-redux";
import { setPickUpDate } from "../../store/orderSlice";

export default function DateSelectModal({ date, maxDayIndex, setIsShowDateSelect }) {
    const maxDayMap = new Map([
        [0, 1],
        [1, 7],
        [2, 30]
    ])
    const dateFilter = date.slice(0, maxDayMap.get(maxDayIndex))

    const dispatch = useDispatch();
    const handleStorePickUpDate = (item) => {
        if(!item.enable) return
        dispatch(setPickUpDate(item.date))
        setIsShowDateSelect(false)
    }
    const dateList = dateFilter.map((item) => {
        const day = dayjs(item.date)

        const text = `${day.isToday() ? '(今天)' : ''} ${day.format('MM/DD')} ${item.enable ? '' : '店休'}`
        return (
            <div key={item.date} onClick={()=>handleStorePickUpDate(item)} className={clsx('flex justify-start px-4 py-3', {
                ' text-black/40 bg-light-bg-seconds': !item.enable,
            })}>
                <span className="text-sm font-semibold">{text}</span>
            </div>
        )
    })
    return (
        <div className=" max-h-[170px] overflow-y-auto bg-light-bg-theme rounded-lg shadow-inner divide-y-2 divide-light-bg">
            {dateList}
        </div>
    )
}