import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function PriceList({ priceList, setPriceList }) {
    const cart = useSelector(state => state.cart.value)
    function getSubTotal() {
        return {
            id: 'subTotal',
            name: '小計',
            price: cart.length ? cart.reduce((acc, item) => acc + item.item.itemprice * item.amount, 0) : undefined
        }
    }
    function getServiceCharge() {
        return {
            id: 'serviceCharge',
            name: '服務費',
            price: 10,
        }
    }
    useEffect(() => {
        const subTotal = getSubTotal()
        const serviceCharge = getServiceCharge()
        setPriceList([subTotal, serviceCharge])
    }, [cart])

    const priceListNode = priceList.map((item) => {
        console.log(priceList);

        return (
            <div key={item.id} className='flex justify-between px-4'>
                <span className=' font-semibold text-sm'>{item.name}</span>
                <span className=' font-semibold text-sm'>${item.price}</span>
            </div>
        )
    })
    return (
        <div className='flex flex-col border-b-2 gap-1 py-2'>
            {priceListNode}
        </div>
    )
}
export default PriceList