import { useSelector } from "react-redux"
import PriceList from '../cart/PriceList.jsx'
import { useState } from "react";

export default function OrderList() {
    const cart = useSelector(state => state.cart.value);
    const cartList = cart.map((item, index) => {
        const mtls = item.mtl.map((option) => option.optionDisplayName).join(', ')

        return (
            <div key={item.id} className="flex justify-between items-center">
                <div className='flex flex-col'>
                    <span className='text-xs font-medium'>{item.amount}x {item.item.productDisplayName}</span>
                    <span className='text-xs text-black/80'>
                        {mtls}
                    </span>
                </div>
                <span className="text-xs">${item.item.price}</span>
            </div>
        )
    });

    return (
        <div>
            <h5 className=" text-base font-semibold my-2">訂單內容</h5>
            <div className="px-4 border-l-4 border-light-bg-seconds">
                <div className="flex flex-col gap-2 py-2">
                    {cartList}
                </div>
                <div className="py-2">
                    <PriceList />
                </div>
            </div>
        </div>
    )
}