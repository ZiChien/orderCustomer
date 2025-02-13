import { useState } from "react";
import MerchantInfo from "./MerchantInfo";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { getAmount } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import MenuDialog from "./MenuDialog";

export default function Order() {
  const [dialogProduct, setDialogProduct] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => {
    setIsDialogOpen(false);
    document.body.style.overflow = "auto";
  };

  const transitions = useTransition(isDialogOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 },
  });
  return (
    <>
      <div className="px-6 w-full h-full overflow-auto flex flex-col">
        <MerchantInfo />
        <div className="grow">
          <Menu
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            dialogProduct={dialogProduct}
            setDialogProduct={setDialogProduct}
            />
          </div>
        <ButtonToCart isDialogOpen={isDialogOpen} />
      </div>
      {transitions((style, isDialogOpen) => {
        return (
          isDialogOpen && (
            <animated.div
              style={style}
              className={"sticky left-0 bottom-0 w-full h-screen"}
            >
              <MenuDialog product={dialogProduct} handleClose={handleClose} />
            </animated.div>
          )
        );
      })}
    </>
  );
}
function ButtonToCart({ isDialogOpen }) {
  const navigate = useNavigate();
  const amount = useSelector(getAmount);

  function handleClick() {
    navigate("../cart");
  }

  if (amount > 0 && !isDialogOpen) {
    return (
      <div className="sticky bottom-0 left-0 w-full py-4">
        <button
          onClick={handleClick}
          className="w-full font-semibold bg-button-check rounded-lg p-2 text-white"
        >
          查看購物車（{amount}）
        </button>
      </div>
    );
  } else {
    return null;
  }
}
