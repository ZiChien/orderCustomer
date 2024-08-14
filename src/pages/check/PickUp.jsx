import { useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "../../store/orderSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import DateSelect from "./DateSelect";
import TimeSelect from "./TimeSelect";

export default function Pickup() {
    const dispatch = useDispatch();
    const customer = useSelector(state => state.order.customer);
    const merchant = useSelector(state => state.merchant.merchantInfo);



    return (
        <>
            <div className="flex gap-4 p-2 py-4 bg-light-bg-theme rounded-lg shadow-inner">
                <div className="w-[40px] h-[40px] flex justify-center items-center shrink-0">
                    <FontAwesomeIcon icon={faLocationDot} size="2xl" />
                </div>
                <div className="flex flex-col ">
                    <span className=" text-base font-bold">{merchant.name}</span>
                    <span className=" text-sm">{merchant.address}</span>
                </div>
            </div>
            <div className="my-2">
                <h6 className="font-semibold text-sm mb-2">取餐時間</h6>
                <div className="flex justify-between">
                    <DateSelect />
                    <TimeSelect />
                </div>
            </div>
        </>
    )
}