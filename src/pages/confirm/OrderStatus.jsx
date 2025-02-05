import { config } from "@fortawesome/fontawesome-svg-core";
import { useSpring, useSprings, animated } from "@react-spring/web";

export default function OrderStatus({ status }) {
  const statusMap = new Map([
    ["PENDING", "等待商家確認中..."],
    ["CONFIRMED", "商家已確認訂單，等待製作..."],
    ["READY", "餐點已準備完成，等待取餐..."],
    ["COMPLETED", "訂單已完成"],
  ]);
  const statusOrder = Array.from(statusMap.keys());
  const currentIndex = statusOrder.indexOf(status);
  const statusClass = (step) => {
    return step <= currentIndex ? "bg-button-check" : "bg-gray-300";
  };
  const fade = useSpring({
    from: { opacity: status === "COMPLETED" ? 1 : 0.5 },
    to: { opacity: 1 },
    loop: { reverse: true },
    reset: true,
    config: { duration: 800 },
    cancel: status === "COMPLETED",
  });

  const statusAnimate = useSprings(
    statusOrder.length,
    statusOrder.map((item, index) => ({
      from: { width: "0%", opacity: 0.5 },
      to: { width: `23%`, opacity: 1 },
      delay: 10,
      loop: true,
      config: { duration: 1000 },
      cancle: index !== currentIndex,
    }))
  );

  return (
    <div className="mb-10 mt-4">
      <animated.div style={fade}>
        <h3 className="pb-4 font-bold text-button-check">
          {statusMap.get(status)}
        </h3>
      </animated.div>
      {status !== "COMPLETED" && (
        <div className="relative flex justify-between items-center">
          <div className="w-full h-[4px] flex justify-between">
            {statusAnimate.map((styles, index) => (
              <div
                key={index}
                className={`w-[23%] h-[5px] ${statusClass(index + 1)}`}
              >
                <animated.div
                  style={styles}
                  className={` absolute w-[23%] h-[5px] ${statusClass(index)}`}
                ></animated.div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
