import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setIsPickup } from "../../store/orderSlice";

export default function Delivery() {
    const dispatch = useDispatch();
    const isPickup = useSelector(state => state.order.isPickup);

    const handleClick = (value) => {
        if (value !== isPickup) dispatch(setIsPickup(value));
    }
    return (
        <div className="w-full flex gap-2 py-2">
            <button onClick={() => handleClick(true)} className={clsx('text-sm font-semibold p-1 px-6 rounded-lg text-button-check border-2 bg-light-bg', {
                ' text-white !bg-button-check': isPickup,
            })}>自取</button>
            <button onClick={() => handleClick(false)} className={clsx('text-sm font-semibold p-1 px-6 rounded-lg text-button-check border-2 bg-light-bg', {
                ' text-white !bg-button-check': !isPickup,
            })}>外送</button>
        </div>
    )
}