import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

import { useDispatch } from "react-redux";
import { setPickUpDate } from "../../store/orderSlice";

export default function DateSelectModal({ availableDate, setIsShowDateSelect }) {
    const dispatch = useDispatch();
    const handleStorePickUpDate = (date) => {
        dispatch(setPickUpDate(date))
        setIsShowDateSelect(false)
    }
    const dateList = availableDate.map((item) => {
        const day = dayjs(item)
        const text = `${day.isToday() ? '(今天)' : ''} ${day.format('MM/DD')}`
        return (
            <div key={item} onClick={() => handleStorePickUpDate(item)} className='flex justify-start px-4 py-3'>
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