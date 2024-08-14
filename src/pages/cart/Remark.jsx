import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setRemark } from '../../store/orderSlice';


export default function Remark() {
    const dispatch = useDispatch()
    const remark = useSelector(state => state.order.remark)
    const handleChange = (e) => {
        dispatch(setRemark(e.target.value))
    }
    return (
        <div className="px-4 py-2">
            {/* <label htmlFor="remark" className="block mb-2 text-base font-bold">備註</label> */}
            <textarea value={remark} onChange={handleChange} id="remark" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-light-bg-theme focus:outline-none resize-none" placeholder="備註(如:不要香菜)"></textarea>
        </div>
    )
}
