import OrderStatus from "./OrderStatus.jsx";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Confirm() {
  const { orderID } = useParams();
  const merchantInfo = useSelector((state) => state.merchant.merchantInfo);
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
        number
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: {
      input: {
        merchantId: merchantInfo?.id,
        orderID: orderID,
      },
    },
    skip: !merchantInfo?.id || !orderID,
    pollInterval: 5000,
  });
  useEffect(() => {
    if (error)
      throw new Response("發生錯誤", { status: 404, statusText: error });
    if (data && !data.getOrder.length)
      throw new Error("此頁面不存在", { cause: "This page doesn't exist!" });
      
  }, [data, error]);
  const order = data?.getOrder[0];

  if (!order)
    return (
      <div className="p-6 pb-10 w-full">
        <Skeleton count={5} className="h-[30px] my-[10px]" />
      </div>
    );

  return (
    <div className="p-6 pb-10 w-full">
      <OrderStatus status={order?.status} />
      <div className="flex flex-col gap-6">
        <div>
          <h6 className="font-semibold text-base mb-2">取餐資訊</h6>
          <div className="flex flex-col gap-1 px-4 border-l-4 border-light-bg-seconds">
            <div className="flex justify-between items-center">
              <span className=" text-sm font-medium">訂單號碼</span>
              <span className=" text-sm">#{order?.number}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" text-sm font-medium">下單時間</span>
              <span className=" text-sm">
                {dayjs(order?.createTime).format("YYYY/MM/DD HH:mm (ddd)")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" text-sm font-medium">取餐時間</span>
              <span className=" text-sm">
                {dayjs(order?.pickUpDateTime).format("YYYY/MM/DD HH:mm (ddd)")}
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
          <OrderDetails content={order?.content} priceList={order?.priceList} />
        </div>
      </div>
    </div>
  );
}
