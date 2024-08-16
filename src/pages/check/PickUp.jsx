import { useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "../../store/orderSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import DateSelect from "./DateSelect";
import TimeSelect from "./TimeSelect";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);


export default function Pickup() {
    const dispatch = useDispatch();
    const merchant = useSelector(state => state.merchant.merchantInfo);
    const pickUpDate = useSelector(state => state.order.pickUpDate);
    const day = dayjs(pickUpDate)

    return (
        <>
            <div>
                <h6 className="font-semibold text-sm mb-2">取餐地址</h6>
                <div className="flex gap-4 p-4 py-4 border-light-bg-theme bg-light-bg-seconds rounded-lg shadow-inner">
                    <div className="w-[40px] h-[40px] flex justify-center items-center shrink-0">
                        <FontAwesomeIcon icon={faLocationDot} size="2xl" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className=" text-sm font-semibold">{merchant.name}</span>
                        <span className=" text-xs">{merchant.address}</span>
                    </div>
                </div>
            </div>
            <div className="my-2">
                <h6 className="font-semibold text-sm mb-2">取餐時間<span className=" text-red-600 text-xl"> *</span></h6>
                <div className="flex justify-between">
                    <DateSelect />
                    <TimeSelect />
                </div>
                {
                    !day.isToday() &&
                    <div className="my-2">
                        <span className="mt-10 px-3 py-1 text-xs bg-button-check text-white rounded-xl font-semibold">
                            此為預約訂單
                        </span>
                    </div>
                }
            </div>
        </>
    )
}