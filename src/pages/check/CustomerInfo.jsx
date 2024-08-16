import { useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "../../store/orderSlice";

export default function CustomerInfo() {
    const dispatch = useDispatch();
    const customer = useSelector(state => state.order.customer);

    const handleChange = (e) => {
        dispatch(setCustomer({ ...customer, name: e.target.value }));
    }
    const [isShowAlert, setIsShowAlert] = useState(false);
    const handleOnBlur = () => {
        if (customer.name === '') {
            setIsShowAlert(true)
        }else{
            setIsShowAlert(false)
        }
    }
    return (
        <div>
            <label htmlFor="customerName">
                <h5 className=" text-base font-semibold my-2">訂購人 <span className=" text-red-600 text-xl">*</span></h5>
            </label>
            <div className="px-3 py-2 border-l-4 border-light-bg-seconds">
                <input onChange={handleChange} onBlur={handleOnBlur} value={customer.name} id="customerName" type="text" className={clsx('w-full rounded-lg p-2 px-2 border-2 border-light-bg-theme text-sm focus:outline-none',{
                    'border-red-600': isShowAlert
                })} placeholder="姓名" />
                {
                    isShowAlert &&
                    <span className=" text-red-600 text-xs px-1">請輸入您的名字</span>
                }
            </div>
        </div>
    )
}