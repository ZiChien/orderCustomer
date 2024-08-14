import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "../../store/orderSlice";

export default function CustomerInfo() {
    const dispatch = useDispatch();
    const customer = useSelector(state => state.order.customer);

    const handleChange = (e) => {
        dispatch(setCustomer({ ...customer, name: e.target.value }));
    }
    return (
        <div>
            <label htmlFor="customerName">
                <h5 className=" font-bold mb-1">訂購人</h5>
            </label>
            <div className="px-3 py-1">
                <input onChange={handleChange} value={customer.name} id="customerName" type="text" className="w-full rounded-lg p-2 px-2 border-2 border-light-bg-theme text-sm" placeholder="姓名" />
            </div>
        </div>
    )
}