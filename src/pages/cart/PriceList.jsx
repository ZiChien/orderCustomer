import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setPriceList } from "../../store/cartSlice";

function PriceList() {
  PriceList.propTypes = {
    priceList: PropTypes.array,
    setPriceList: PropTypes.func,
  };
  const dispatch = useDispatch();
  const priceList = useSelector((state) => state.cart.priceList);
  const cart = useSelector((state) => state.cart.value);
  useEffect(() => {
    function getSubTotal() {
      return {
        id: new Date().getTime(),
        name: "小計",
        price: cart.length
          ? cart.reduce(
              (acc, item) => acc + item.product.price * item.amount,// todo: item.price * item.amount item.price is total price include option price
              0
            )
          : undefined,
      };
    }
    function getServiceCharge() {
      return {
        id: "serviceCharge",
        name: "服務費",
        price: 10,
      };
    }
    const subTotal = getSubTotal();
    const serviceCharge = getServiceCharge();
    dispatch(setPriceList([subTotal, serviceCharge]));
  }, [cart]);

  const priceListNode = priceList.map((item) => {
    return (
      <div key={item.id} className="flex justify-between">
        <span className="font-medium text-xs">{item.name}</span>
        <span className="font-medium text-xs">${item.price}</span>
      </div>
    );
  });
  return (
    <div className="flex flex-col border-b-2 gap-1 py-2">{priceListNode}</div>
  );
}
export default PriceList;
