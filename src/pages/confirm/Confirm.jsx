import OrderStatus from "./OrderStatus.jsx";
import { gql, useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentOrder, setCurrentOrder } from "../../store/userSlice";
import { useEffect } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getMerchantInfo } from "../../store/merchantSlice.js";
import { useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails.jsx";

export default function Confirm() {
  const { merchant } = useParams();
  const dispatch = useDispatch();
  const merchantInfo = useSelector((state) => state.merchant.merchantInfo);
  useEffect(() => {
    dispatch(getMerchantInfo(merchant));
  }, []);
  const currentOrder = useSelector(selectCurrentOrder);
  const GET_ORDER = gql`
    query GetOrder($input: GetOrderInput!) {
      getOrder(input: $input) {
        orderID
        merchantId
        content {
          id
          product {
            productId
            productName
            productDisplayName
            productDescription
            price
            status
            attributes {
              attributeId
              attributeName
              attributeDisplayName
              attributeDescription
              status
              option {
                optionId
                optionName
                optionDisplayName
                optionDescription
                price
                status
              }
            }
          }
          amount
        }
        remark
        tableware
        customer {
          name
          phone
          userId
        }
        priceList {
          id
          name
          price
        }
        amount
        totalPrice
        isLine
        pickUpDateTime
        status
        createTime
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: {
      input: {
        merchantId: currentOrder.merchantId,
        orderID: currentOrder.orderID,
      },
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (data && data.getOrder.length) {
      console.log(data.getOrder[0]);
      dispatch(setCurrentOrder(data.getOrder[0]));
    }
  }, [data, dispatch]);
  return (
    <div className="p-6 pb-10 w-full">
      <OrderStatus status={currentOrder.status} />
      <div className="flex flex-col gap-6">
        <div>
          <h6 className="font-semibold text-base mb-2">取餐資訊</h6>
          <div className="flex flex-col gap-1 px-4 border-l-4 border-light-bg-seconds">
            <div className="flex justify-between items-center">
              <span className=" text-sm font-medium">訂單編號</span>
              <span className=" text-sm">{currentOrder.orderID}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" text-sm font-medium">訂單時間</span>
              <span className=" text-sm">
                {dayjs(currentOrder.createTime).format("YYYY/MM/DD HH:mm")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" text-sm font-medium">取餐時間</span>
              <span className=" text-sm">
                {dayjs(currentOrder.pickUpDateTime).format("YYYY/MM/DD HH:mm")}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h6 className="font-semibold text-base mb-2">取餐地址</h6>
          <div className="flex gap-4 p-4 py-4 border-light-bg-theme bg-light-bg-seconds rounded-lg shadow-inner">
            <div className="w-[40px] h-[40px] flex justify-center items-center shrink-0">
              <FontAwesomeIcon icon={faLocationDot} size="2xl" />
            </div>
            <div className="flex flex-col justify-center">
              <span className=" text-sm font-semibold">
                {merchantInfo?.name}
              </span>
              <span className=" text-xs">{merchantInfo?.address}</span>
            </div>
          </div>
        </div>
        <div>
          <h6 className="font-semibold text-base mb-2">訂單明細</h6>
          <OrderDetails content={currentOrder.content} priceList={currentOrder.priceList} />
        </div>
      </div>
    </div>
  );
}
