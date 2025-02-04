import { useSelector } from "react-redux";
import PriceList from "../cart/PriceList.jsx";
import { useState } from "react";

export default function OrderDetails({ content, priceList }) {
  const cartList = content.map((item, index) => {
    const attributes = item.product.attributes
      .map((attribute) => attribute.option.optionDisplayName)
      .join(", ");

    return (
      <div key={item.id} className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs font-medium">
            {item.amount}x {item.product.productDisplayName}
          </span>
          <span className="text-xs text-black/80">{attributes}</span>
        </div>
        <span className="text-xs">${item.product.price}</span>
      </div>
    );
  });
  const priceListNode = priceList.map((item) => {
    return (
      <div key={item.id} className="flex justify-between">
        <span className="font-medium text-xs">{item.name}</span>
        <span className="font-medium text-xs">${item.price}</span>
      </div>
    );
  });

  return (
    <div>
      <div className="px-4 border-l-4 border-light-bg-seconds">
        <div className="flex flex-col gap-2 py-2">{cartList}</div>
        <div className="py-2">
          <div className="flex flex-col border-b-2 gap-1 py-2">
            {priceListNode}
          </div>
        </div>
      </div>
    </div>
  );
}
